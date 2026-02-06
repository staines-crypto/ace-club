const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* =========================
   ADD EVENT (WITH IMAGE)
========================= */
router.post("/", upload.single("cover_image"), (req, res) => {
  const { title, description, event_type, status, event_date } = req.body;

  if (!title || !description || !event_type || !status || !event_date) {
    return res.status(400).json({ message: "All required fields missing" });
  }

  // ✅ SAFE IMAGE PATH
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO events
    (title, description, event_type, status, event_date, cover_image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, event_type, status, event_date, imagePath],
    (err, result) => {
      if (err) {
        console.error("EVENT INSERT ERROR:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage
        });
      }

      res.json({
        message: "Event added successfully",
        event: {
          id: result.insertId,
          title,
          description,
          event_type,
          status,
          event_date,
          cover_image: imagePath
        }
      });
    }
  );
});

/* =========================
   GET ALL EVENTS
========================= */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM events ORDER BY event_date ASC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

/* =========================
   FILTER EVENTS
========================= */
router.get("/filter", (req, res) => {
  const { status, event_type } = req.query;

  let sql = "SELECT * FROM events WHERE 1=1";
  const params = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (event_type) {
    sql += " AND event_type = ?";
    params.push(event_type);
  }

  sql += " ORDER BY event_date ASC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

/* =========================
   DELETE EVENT
========================= */
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM events WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Event deleted" });
  });
});

module.exports = router;
