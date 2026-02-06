import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

function NonTechnicalNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search & 📅 Date
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/news/category/non-technical")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // 🧠 Filter logic
  const filteredNews = news.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const dateMatch = selectedDate
      ? new Date(post.created_at).toISOString().split("T")[0] === selectedDate
      : true;

    return titleMatch && dateMatch;
  });

  return (
    <div className="container">
      <h2>Non-Technical News</h2>

      {/* 🔍 SEARCH BAR + 📅 CALENDAR */}
      <div className="news-filters">
        <input
          type="text"
          placeholder="Search non-technical news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {filteredNews.length === 0 ? (
        <p>No non-technical news found.</p>
      ) : (
        filteredNews.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}

export default NonTechnicalNews;
