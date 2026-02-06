import { useEffect, useState } from "react";
import "../components/Container.css";
import "../components/NewsCard.css";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading news...</div>;
  }

  return (
    <div className="container">
      <h2>Latest News</h2>

      {news.length === 0 && <p>No news available.</p>}

      {news.map((item) => (
        <div key={item.id} className="news-card">
          {item.image && <img src={item.image} alt={item.title} />}
          <div className="news-content">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div className="news-meta">
              {item.category.toUpperCase()} •{" "}
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
