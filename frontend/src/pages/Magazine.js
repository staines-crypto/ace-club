import { useEffect, useState } from "react";
import "./Magazine.css";

function Magazine() {
  const [magazines, setMagazines] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | az | za

  useEffect(() => {
    fetch("http://localhost:5000/api/magazines")
      .then((res) => res.json())
      .then((data) => setMagazines(data))
      .catch((err) => console.error(err));
  }, []);

  /* 🔍 SEARCH */
  let filteredMagazines = magazines.filter((mag) =>
    mag.title.toLowerCase().includes(search.toLowerCase())
  );

  /* 🔃 SORT */
  filteredMagazines = filteredMagazines.sort((a, b) => {
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
      <h2 className="page-title">Magazines</h2>

      {/* 🔍 SEARCH + SORT BAR */}
      <div className="magazine-controls">
        <div className="magazine-search">
          <input
            type="text"
            placeholder="Search magazines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="magazine-sort">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest </option>
            <option value="az"> A–Z</option>
            <option value="za"> Z–A</option>
          </select>
        </div>
      </div>

      {filteredMagazines.length === 0 ? (
        <p>No magazines found.</p>
      ) : (
        <div className="magazine-grid">
          {filteredMagazines.map((mag) => (
            <div
              className="magazine-card"
              key={mag.id}
              onClick={() =>
                window.open(`http://localhost:5000${mag.pdf}`, "_blank")
              }
            >
              {/* ✅ COVER IMAGE */}
              <img
                src={`http://localhost:5000${mag.cover}`}
                alt={mag.title}
              />

              <div className="mag-info">
                <h3>{mag.title}</h3>
                <p className="mag-date">
                  {new Date(mag.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Magazine;
