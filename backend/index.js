import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import multer from "multer";
import { parse } from "csv-parse/sync";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "https://tapnotech.in",
      "https://api.technotech.in",
      process.env.FRONTEND_URL,
      "https://technotech.in",
      "https://tepnotech.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  gateway: { type: String, enum: ["cashfree", "razorpay"], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  status: { type: String, default: "initiated" },
  paymentSessionId: String,
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

const uploadedDataSchema = new mongoose.Schema({
  // amount: { type: Number, required: true },
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  processed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
});

const UploadedData = mongoose.model("UploadedData", uploadedDataSchema);

const gatewayCounterSchema = new mongoose.Schema({
  counter: { type: Number, default: 0 },
});

const GatewayCounter = mongoose.model("GatewayCounter", gatewayCounterSchema);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function getNextGateway() {
  let counter = await GatewayCounter.findOne();

  if (!counter) {
    counter = await GatewayCounter.create({ counter: 0 });
  }

  const gateway = counter.counter % 2 === 0 ? "cashfree" : "razorpay";

  // Increment counter for next request
  counter.counter += 1;
  await counter.save();

  return gateway;
}

app.post("/get-gateway", async (req, res) => {
  try {
    const gateway = await getNextGateway();
    res.json({ gateway });
  } catch (err) {
    console.error("Error determining gateway:", err);
    res.status(500).json({ error: "Failed to determine payment gateway" });
  }
});

app.post("/create-order", async (req, res) => {
  const { order_id, amount, name, phone, email } = req.body;

  try {
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
        order_id,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: order_id,
          customer_name: name,
          customer_email: email || "",
          customer_phone: phone || "",
        },
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    await Payment.create({
      orderId: order_id,
      gateway: "cashfree",
      amount: amount,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      paymentSessionId: response.data.payment_session_id,
      status: "initiated",
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/create-razorpay-order", async (req, res) => {
  const { order_id, amount, name, phone, email } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: order_id,
      notes: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await Payment.create({
      orderId: order_id,
      gateway: "razorpay",
      amount: amount,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      razorpayOrderId: razorpayOrder.id,
      status: "initiated",
    });

    res.json({
      razorpay_order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

app.post("/verify-razorpay-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const crypto = await import("crypto");
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      // Update payment status in database
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "SUCCESS", updatedAt: Date.now() }
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verification Error:", err);
    res
      .status(500)
      .json({ success: false, error: "Payment verification failed" });
  }
});

app.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

app.post("/upload-payment-data", async (req, res) => {
  const { fullname, phone, email } = req.body;

  try {
    const uploadedData = await UploadedData.create({
      // amount,
      fullname,
      phone,
      email,
      processed: false,
    });

    res.json({ success: true, data: uploadedData });
  } catch (err) {
    console.error("Error uploading data:", err);
    res.status(500).json({ error: "Failed to upload payment data" });
  }
});

app.post("/upload-csv", upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = req.file.buffer.toString("utf-8");
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const validRecords = [];
    const errors = [];

    records.forEach((record, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and row 1 is header

      if (!record.fullname || !record.fullname.trim()) {
        errors.push(`Row ${rowNumber}: Full name is required`);
        return;
      }

      if (!record.phone || !/^\d{10}$/.test(record.phone.trim())) {
        errors.push(
          `Row ${rowNumber}: Invalid phone number (must be 10 digits)`
        );
        return;
      }

      if (
        !record.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email.trim())
      ) {
        errors.push(`Row ${rowNumber}: Invalid email`);
        return;
      }

      validRecords.push({
        // amount: Number.parseFloat(record.amount),
        fullname: record.fullname.trim(),
        phone: record.phone.trim(),
        email: record.email.trim(),
        processed: false,
      });
    });

    if (validRecords.length === 0) {
      return res.status(400).json({
        error: "No valid records found in CSV",
        errors: errors,
      });
    }

    // Insert all valid records
    const insertedData = await UploadedData.insertMany(validRecords);

    res.json({
      success: true,
      message: `Successfully uploaded ${insertedData.length} records`,
      inserted: insertedData.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Error uploading CSV:", err);
    res.status(500).json({ error: "Failed to upload CSV file" });
  }
});

app.get("/uploaded-data", async (req, res) => {
  try {
    const { filter } = req.query; // 'all', 'processed', 'unprocessed'

    const query = {};
    if (filter === "processed") {
      query.processed = true;
    } else if (filter === "unprocessed") {
      query.processed = false;
    }
    const data = await UploadedData.find(query).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching uploaded data:", err);
    res.status(500).json({ error: "Failed to fetch uploaded data" });
  }
});

app.post("/verify-autofill-code", async (req, res) => {
  const { code } = req.body;

  try {
    if (code !== process.env.AUTOFILL_CODE) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    // Get the first unprocessed data
    const unprocessedData = await UploadedData.findOne({
      processed: false,
    }).sort({ createdAt: 1 });

    if (!unprocessedData) {
      return res
        .status(404)
        .json({ success: false, message: "No unprocessed data available" });
    }

    res.json({
      success: true,
      data: {
        id: unprocessedData._id,
        // amount: unprocessedData.amount,
        name: unprocessedData.fullname,
        phone: unprocessedData.phone,
        email: unprocessedData.email,
      },
    });
  } catch (err) {
    console.error("Error verifying code:", err);
    res.status(500).json({ error: "Failed to verify code" });
  }
});

app.post("/mark-data-processed", async (req, res) => {
  const { dataId } = req.body;

  try {
    await UploadedData.findByIdAndUpdate(dataId, {
      processed: true,
      processedAt: Date.now(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error marking data as processed:", err);
    res.status(500).json({ error: "Failed to mark data as processed" });
  }
});

app.delete("/uploaded-data/:id", async (req, res) => {
  try {
    await UploadedData.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT || 5000}`)
);
