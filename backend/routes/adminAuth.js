const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

let currentOTP = null;
let otpExpiresAt = null;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 🔥 THIS FIXES IT
  },
});


transporter.verify((err) => {
  if (err) console.error("❌ Mail error:", err);
  else console.log("✅ Gmail SMTP ready");
});

router.post("/send-otp", async (req, res) => {
  currentOTP = Math.floor(100000 + Math.random() * 900000);
  otpExpiresAt = Date.now() + 5 * 60 * 1000;

  try {
    await transporter.sendMail({
      from: `"ACE Club Admin" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "ACE Club Admin Login OTP",
      text: `Your OTP is ${currentOTP}. Valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!currentOTP || Date.now() > otpExpiresAt)
    return res.status(401).json({ message: "OTP expired" });

  if (parseInt(otp) === currentOTP) {
    currentOTP = null;
    otpExpiresAt = null;
    return res.json({ success: true });
  }

  res.status(401).json({ message: "Invalid OTP" });
});

module.exports = router;
