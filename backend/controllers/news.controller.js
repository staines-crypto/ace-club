const db = require("../db");

exports.addNews = (req, res) => {
  const { title, content, category, image } = req.body;

  const sql =
    "INSERT INTO news (title, content, category, image) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, content, category, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "News added successfully" });
  });
};

exports.getAllNews = (req, res) => {
  db.query("SELECT * FROM news ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getTechnicalNews = (req, res) => {
  db.query(
    "SELECT * FROM news WHERE category='technical' ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getNonTechnicalNews = (req, res) => {
  db.query(
    "SELECT * FROM news WHERE category='non-technical' ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};
