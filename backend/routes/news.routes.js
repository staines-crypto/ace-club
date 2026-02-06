const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/news"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* =========================
   GET ROUTES (FIRST)
========================= */

// 🔹 ALL NEWS
router.get("/", (req, res) => {
  db.query("SELECT * FROM news ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// 🔹 BY CATEGORY
router.get("/category/:category", (req, res) => {
  db.query(
    "SELECT * FROM news WHERE category = ? ORDER BY id DESC",
    [req.params.category],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* =========================
   POST ROUTE
========================= */
router.post("/", upload.single("image"), (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? `/uploads/news/${req.file.filename}` : null;

  db.query(
    "INSERT INTO news (title, content, category, image) VALUES (?, ?, ?, ?)",
    [title, content, category, image],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "News added successfully" });
    }
  );
});

/* =========================
   DELETE ROUTE (LAST 🔥)
========================= */
router.delete("/:id", (req, res) => {
  console.log("🗑️ DELETE NEWS ID:", req.params.id);

  db.query(
    "DELETE FROM news WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "News not found" });

      res.json({ message: "News deleted successfully" });
    }
  );
});

module.exports = router;
