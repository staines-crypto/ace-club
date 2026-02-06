const express = require("express");
const router = express.Router();   // ✅ THIS WAS MISSING
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

/* ================= MULTER STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/magazines";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= ADD MAGAZINE ================= */
router.post(
  "/",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  (req, res) => {
    const { title } = req.body;

    if (!title || !req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "All fields required" });
    }

    const pdfPath = `/uploads/magazines/${req.files.pdf[0].filename}`;
    const coverPath = `/uploads/magazines/${req.files.cover[0].filename}`;

    const sql =
      "INSERT INTO magazines (title, cover, pdf) VALUES (?, ?, ?)";

    db.query(sql, [title, coverPath, pdfPath], (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Magazine uploaded successfully" });
    });
  }
);

/* ================= GET MAGAZINES ================= */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM magazines ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

/* ================= DELETE MAGAZINE ================= */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM magazines WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ message: "Delete failed" });
      }

      res.json({ message: "Magazine deleted" });
    }
  );
});

module.exports = router;
