const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// 🔐 Change these credentials
const ADMIN_USERNAME = "Saahil@17861";



// Generate this once and keep it fixed
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("Saahil@17861", 10);

// 🔐 LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME)
    return res.status(401).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ success: true, token });
});

module.exports = router;
