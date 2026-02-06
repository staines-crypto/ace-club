const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");

/* ================= STORAGE ================= */
const storage = multer.diskStorage({
  destination: "uploads/coordinators",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ================= ADD COORDINATOR ================= */
router.post("/", upload.single("image"), (req, res) => {
  const { name, domain, branch, year } = req.body;

  if (!name || !domain || !branch || !year || !req.file) {
    return res.status(400).json({ message: "All fields required" });
  }

  const image = `/uploads/coordinators/${req.file.filename}`;

  db.query(
    "INSERT INTO coordinators (name, domain, branch, year, image) VALUES (?, ?, ?, ?, ?)",
    [name, domain, branch, year, image],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Coordinator added" });
    }
  );
});

/* ================= UPDATE COORDINATOR (EDIT) ================= */
router.put("/:id", upload.single("image"), (req, res) => {
  const { name, domain, branch, year } = req.body;
  const { id } = req.params;

  if (!name || !domain || !branch || !year) {
    return res.status(400).json({ message: "All fields required" });
  }

  // ✅ If image uploaded → update image
  if (req.file) {
    const image = `/uploads/coordinators/${req.file.filename}`;

    db.query(
      "UPDATE coordinators SET name=?, domain=?, branch=?, year=?, image=? WHERE id=?",
      [name, domain, branch, year, image, id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Coordinator updated" });
      }
    );
  } 
  // ✅ If NO image uploaded → keep old image
  else {
    db.query(
      "UPDATE coordinators SET name=?, domain=?, branch=?, year=? WHERE id=?",
      [name, domain, branch, year, id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Coordinator updated" });
      }
    );
  }
});

/* ================= GET COORDINATORS ================= */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM coordinators ORDER BY domain, created_at",
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* ================= DELETE COORDINATOR ================= */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM coordinators WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
});

module.exports = router;
