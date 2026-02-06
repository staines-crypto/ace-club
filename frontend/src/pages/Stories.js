import { useEffect, useState } from "react";
import "./Stories.css";

function Stories() {
  const [stories, setStories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | az | za

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error(err));
  }, []);

  /* ================= STORY DETAIL ================= */
  if (selected) {
    return (
      <div className="container story-detail">
        <button className="back-btn" onClick={() => setSelected(null)}>
          ← Back to Stories
        </button>

        <div className="story-detail-card">
          <img
            src={`http://localhost:5000${selected.image}`}
            alt={selected.title}
          />

          <div className="story-detail-content">
            <h2>{selected.title}</h2>
            <p className="author">by {selected.author}</p>

            <p className="full-desc">{selected.description}</p>

            <a
              href={`http://localhost:5000${selected.pdf}`}
              className="download-btn"
              download
            >
              ⬇ Download Story (PDF)
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ================= SEARCH ================= */
  let filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.author.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= SORT ================= */
  filteredStories = filteredStories.sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sort === "oldest") {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    if (sort === "az") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "za") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="container">
      <h2 className="page-title">Stories</h2>

      {/* 🔍 SEARCH + SORT */}
      <div className="story-controls">
        <input
          className="story-search"
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="story-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
        </select>
      </div>

      {filteredStories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <div className="stories-grid">
          {filteredStories.map((story) => (
            <div
              className="story-card"
              key={story.id}
              onClick={() => setSelected(story)}
            >
              <img
                src={`http://localhost:5000${story.image}`}
                alt={story.title}
              />

              <div className="story-info">
                <h3>{story.title}</h3>
                <p className="story-author">by {story.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stories;
