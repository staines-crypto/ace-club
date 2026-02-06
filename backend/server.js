const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================
   CORS (FIXED & SAFE)
========================= */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =========================
   ROUTES
========================= */
app.use("/api/admin", require("./routes/adminAuth"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/breaking-news", require("./routes/breakingNews.routes"));
app.use("/api/stories", require("./routes/stories.routes"));
app.use("/api/magazines", require("./routes/magazines.routes"));
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/coordinators", require("./routes/coordinators.routes"));

/* =========================
   TEST
========================= */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working ✅" });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
