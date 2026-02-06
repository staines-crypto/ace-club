const express = require("express");
const router = express.Router();
const db = require("../db");

/* ================================
   SET / UPDATE BREAKING NEWS
================================ */
router.post("/", (req, res) => {
  const { message, is_active } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "",
      is_active: false,
      error: "Message required",
    });
  }

  // Deactivate previous breaking news
  db.query("UPDATE breaking_news SET is_active = 0", (err) => {
    if (err) {
      return res.status(500).json({
        message: "",
        is_active: false,
        error: "Failed to reset previous news",
      });
    }

    // Insert new breaking news
    db.query(
      "INSERT INTO breaking_news (message, is_active) VALUES (?, ?)",
      [message, is_active ? 1 : 0],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "",
            is_active: false,
            error: "Insert failed",
          });
        }

        res.json({
          message,
          is_active: is_active ? 1 : 0,
        });
      }
    );
  });
});

/* ================================
   GET ACTIVE BREAKING NEWS
================================ */
router.get("/", (req, res) => {
  db.query(
    "SELECT message, is_active FROM breaking_news WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "",
          is_active: false,
        });
      }

      // ✅ ALWAYS return an object (never null)
      if (rows.length === 0) {
        return res.json({
          message: "",
          is_active: false,
        });
      }

      res.json({
        message: rows[0].message,
        is_active: Boolean(rows[0].is_active),
      });
    }
  );
});

module.exports = router;
