// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { load } from "@cashfreepayments/cashfree-js";

// const PaymentPage = () => {
//   const { service } = useParams();
//   const navigate = useNavigate();
//   const decodedService = decodeURIComponent(service);

//   const [formData, setFormData] = useState({
//     amount: "",
//     name: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState({
//     amount: "",
//     name: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [generalError, setGeneralError] = useState("");

//   const validateForm = () => {
//     const newErrors = { amount: "", name: "", phone: "" };
//     let isValid = true;

//     // Validate Amount (required, positive number)
//     if (!formData.amount) {
//       newErrors.amount = "Amount is required.";
//       isValid = false;
//     } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
//       newErrors.amount = "Amount must be a positive number.";
//       isValid = false;
//     }

//     // Validate Name (required, letters/spaces/hyphens/apostrophes only)
//     if (!formData.name) {
//       newErrors.name = "Full Name is required.";
//       isValid = false;
//     } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
//       newErrors.name = "Name can only contain letters, spaces, hyphens, or apostrophes.";
//       isValid = false;
//     }

//     // Validate Phone (optional, but if provided, must be 10 digits)
//     if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error for the field being edited
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handlePayment = async () => {
//     setGeneralError("");
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           order_id: "order_" + Date.now(),
//           amount: parseFloat(formData.amount),
//           name: formData.name,
//           phone: formData.phone || "N/A",
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create order");
//       }

//       const data = await res.json();
//       const { payment_session_id } = data;

//       if (!payment_session_id) {
//         throw new Error("No payment_session_id received");
//       }

//       const cashfree = await load({ mode: process.env.VITE_CASHFREE_ENV || "sandbox" });
//       await cashfree.checkout({
//         paymentSessionId: payment_session_id,
//         redirectTarget: "_self",
//       });
//     } catch (err) {
//       console.error(err);
//       setGeneralError("Payment failed! Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-6 text-black">
//           Request {decodedService}
//         </h2>

//         {generalError && (
//           <div
//             className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
//             role="alert"
//             aria-live="assertive"
//           >
//             {generalError}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="amount" className="block text-sm font-medium mb-1">
//               Amount (₹) *
//             </label>
//             <input
//               type="number"
//               id="amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="Enter amount"
//               className={`w-full border ${errors.amount ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//               aria-invalid={!!errors.amount}
//               aria-describedby={errors.amount ? "amount-error" : undefined}
//             />
//             {errors.amount && (
//               <p id="amount-error" className="text-red-500 text-sm mt-1">
//                 {errors.amount}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-1">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//               aria-invalid={!!errors.name}
//               aria-describedby={errors.name ? "name-error" : undefined}
//             />
//             {errors.name && (
//               <p id="name-error" className="text-red-500 text-sm mt-1">
//                 {errors.name}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter your phone number"
//               className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? "phone-error" : undefined}
//             />
//             {errors.phone && (
//               <p id="phone-error" className="text-red-500 text-sm mt-1">
//                 {errors.phone}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
//             aria-busy={loading}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//           <button
//             onClick={() => navigate("/")}
//             className="w-full bg-gray-300 text-black py-3 rounded-md font-semibold hover:bg-gray-400 transition mt-2"
//             disabled={loading}
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentPage = () => {
    const { service } = useParams();
    const navigate = useNavigate();
    const decodedService = decodeURIComponent(service);

    const [formData, setFormData] = useState({
        amount: "",
        name: "",
        phone: "",
    });
    const [errors, setErrors] = useState({
        amount: "",
        name: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const validateForm = () => {
        const newErrors = { amount: "", name: "", phone: "" };
        let isValid = true;

        // Validate Amount (required, positive number)
        if (!formData.amount) {
            newErrors.amount = "Amount is required.";
            isValid = false;
        } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "Amount must be a positive number.";
            isValid = false;
        }

        // Validate Name (required, letters/spaces/hyphens/apostrophes only)
        if (!formData.name) {
            newErrors.name = "Full Name is required.";
            isValid = false;
        } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
            newErrors.name = "Name can only contain letters, spaces, hyphens, or apostrophes.";
            isValid = false;
        }

        // Validate Phone (optional, but if provided, must be 10 digits)
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field being edited
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handlePayment = async () => {
        setGeneralError("");
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order_id: "order_" + Date.now(),
                    amount: parseFloat(formData.amount),
                    name: formData.name,
                    phone: formData.phone || "N/A",
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order");
            }

            const data = await res.json();
            const { payment_session_id } = data;

            if (!payment_session_id) {
                throw new Error("No payment_session_id received");
            }

            const cashfree = await load({ mode: process.env.VITE_CASHFREE_ENV || "sandbox" });
            await cashfree.checkout({
                paymentSessionId: payment_session_id,
                redirectTarget: "_self",
            });
        } catch (err) {
            console.error(err);
            setGeneralError("Payment failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-6 text-black">
                    Request {decodedService}
                </h2>

                {generalError && (
                    <div
                        className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
                        role="alert"
                        aria-live="assertive"
                    >
                        {generalError}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium mb-1">
                            Amount (₹) *
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className={`w-full border ${errors.amount ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                            aria-invalid={!!errors.amount}
                            aria-describedby={errors.amount ? "amount-error" : undefined}
                        />
                        {errors.amount && (
                            <p id="amount-error" className="text-red-500 text-sm mt-1">
                                {errors.amount}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                            <p id="name-error" className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                            <p id="phone-error" className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                        aria-busy={loading}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-gray-300 text-black py-3 rounded-md font-semibold hover:bg-gray-400 transition mt-2"
                        disabled={loading}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;