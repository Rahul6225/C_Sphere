const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");//module to perform operation's like hashing..

const router = express.Router();

// Initialize Razorpay instance using api key and secret from .env file.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create an order
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR)
      currency,//amount and currency will be taken from the frontend part of application.
      receipt: `receipt_${Date.now()}`,//Generates a unique receipt identifier using the current timestamp.
    };
    const order = await razorpay.orders.create(options);//Calls Razorpay's API to create an order using the provided options.
    res.json({ orderId: order.id, amount: order.amount });//sends order id and amount to the frontend.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order", details: error.message });

  }
});

// Route to verify payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (hash === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully!" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed!" });
  }
});
// changes done 

module.exports = router;
