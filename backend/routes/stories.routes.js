const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");
const path = require("path");

/* STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/stories");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* POST STORY (PDF + IMAGE) */
router.post(
  "/",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res) => {
    const { title, author, description } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !req.files?.pdf ||
      !req.files?.image
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const pdf = `/uploads/stories/${req.files.pdf[0].filename}`;
    const image = `/uploads/stories/${req.files.image[0].filename}`;

    const sql = `
      INSERT INTO stories (title, author, description, pdf, image)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [title, author, description, pdf, image],
      (err) => {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.json({ message: "Story uploaded successfully" });
      }
    );
  }
);

/* GET STORIES */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM stories ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

/* DELETE STORY */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Story ID required" });
  }

  const sql = "DELETE FROM stories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully" });
  });
});
module.exports = router;
