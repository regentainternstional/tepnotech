import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    'https://tapnotech.in',
    'https://api.technotech.in',
    process.env.FRONTEND_URL,
    'https://technotech.in',
    'https://tepnotech.in'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.post("/create-order", async (req, res) => {
  console.log("order is creating");
  const { order_id, amount, name, phone } = req.body;

  try {
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders", // LIVE endpoint
      {
        order_id,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: order_id,
          customer_name: name,
          customer_email: email,
          customer_phone: phone === "N/A" ? "0000000000" : phone,
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

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT || 5000}`)
);
