require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");



const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Momade Pickles Backend Running");
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // ₹100 = 10000 paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-order-email", async (req, res) => {
  try {
    const {
      orderId,
      customer,
      cart,
      total,
      paymentId,
    } = req.body;

    const products = cart
      .map(
        (item) =>
          `${item.name} × ${item.quantity}`
      )
      .join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: "momadepickles1@gmail.com",

      subject: `New Order - ${orderId}`,

      text: `
NEW ORDER RECEIVED

Order ID:
${orderId}

Customer Name:
${customer.name}

Phone:
${customer.phone}

State:
${customer.state}

Location:
${customer.location}

Address:
${customer.address}

Pincode:
${customer.pincode}

Products:
${products}

Total:
₹${total}

Payment ID:
${paymentId}
      `,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});