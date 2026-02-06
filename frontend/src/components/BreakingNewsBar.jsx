import { useEffect, useState } from "react";
import "./BreakingNewsBar.css";

function BreakingNewsBar() {
  const [news, setNews] = useState("");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/breaking-news")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (data?.is_active && data?.message) {
          setNews(data.message);
        } else {
          setNews(""); // 👈 force safe value
        }
      })
      .catch(() => {
        setNews(""); // 👈 never leave it null
      });
  }, []);

  if (!news) return null;

  return (
    <div className="breaking-wrapper">
      <div className="breaking-label">BREAKING NEWS!</div>

      <div
        className={`breaking-marquee ${paused ? "paused" : ""}`}
        onClick={() => setPaused(p => !p)}
        title="Click to pause / resume"
      >
        <span>{news}</span>
      </div>
    </div>
  );
}

export default BreakingNewsBar;
