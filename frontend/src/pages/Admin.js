import { useState, useEffect } from "react";
import "../components/Container.css";
import "./Admin.css";

function Admin() {
  /* 🔐 LOGIN */
const [loggedIn, setLoggedIn] = useState(
  sessionStorage.getItem("adminLoggedIn") === "true"
);


  /* 📌 ACTIVE TAB */
  const [tab, setTab] = useState("news");

  /* 📰 NEWS FORM */
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("technical");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  /* 📘 MAGAZINE FORM */
  const [magTitle, setMagTitle] = useState("");
  const [magPdf, setMagPdf] = useState(null);
  const [magCover, setMagCover] = useState(null);

  /* 📄 STORY FORM */
  const [storyTitle, setStoryTitle] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("");
  const [storyDesc, setStoryDesc] = useState("");
  const [storyPdf, setStoryPdf] = useState(null);
  const [storyImage, setStoryImage] = useState(null);

 

  /* 🚨 BREAKING NEWS */
const [breakingText, setBreakingText] = useState("");
const [showBreaking, setShowBreaking] = useState(false);

 /* 📅 EVENTS FORM */
const [eventTitle, setEventTitle] = useState("");
const [eventDesc, setEventDesc] = useState("");
const [eventType, setEventType] = useState("technical");
const [eventStatus, setEventStatus] = useState("upcoming");
const [eventDate, setEventDate] = useState("");
const [events, setEvents] = useState([]);
const [eventImage, setEventImage] = useState(null);

/* 👥 COORDINATORS FORM */
const [coordName, setCoordName] = useState("");
const [coordDomain, setCoordDomain] = useState("overall");
const [coordBranch, setCoordBranch] = useState("");
const [coordYear, setCoordYear] = useState("");
const [coordImage, setCoordImage] = useState(null);
const [coordinators, setCoordinators] = useState([]);
const [editingId, setEditingId] = useState(null);

  /* 📋 LIST DATA */
  const [newsList, setNewsList] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [stories, setStories] = useState([]);

  // 🔐 OTP STATES
const [otp, setOtp] = useState("");
const [otpStep, setOtpStep] = useState(1); // 1 = send, 2 = verify
const [otpMsg, setOtpMsg] = useState("");

const sendOtp = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/admin/send-otp", {
      method: "POST",
    });

    const data = await res.json();
    setOtpMsg(data.message || "OTP sent");
    setOtpStep(2);
  } catch {
    setOtpMsg("❌ Failed to send OTP");
  }
};
const verifyOtp = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/admin/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });

    const data = await res.json();

    // ✅ ONLY HERE
    if (data.success) {
      sessionStorage.setItem("adminLoggedIn", "true");
      setLoggedIn(true);

      // optional cleanup
      setOtp("");
      setOtpMsg("");
      setOtpStep(1);
    } else {
      setOtpMsg(data.message || "Invalid OTP");
    }
  } catch {
    setOtpMsg("❌ OTP verification failed");
  }
};


  /* 🔄 FETCH DATA */
  useEffect(() => {
    if (!loggedIn) return;

    if (tab === "news") {
      fetch("http://localhost:5000/api/news")
        .then(res => res.json())
        .then(setNewsList);
    }

    if (tab === "magazines") {
      fetch("http://localhost:5000/api/magazines")
        .then(res => res.json())
        .then(setMagazines);
    }

    if (tab === "stories") {
      fetch("http://localhost:5000/api/stories")
        .then(res => res.json())
        .then(setStories);
    }
    if (tab === "breaking") {
    fetch("http://localhost:5000/api/breaking-news")
    .then(res => res.json())
    .then(data => {
      setBreakingText(data.message || "");
      setShowBreaking(data.is_active || false);
    });
}

    if (tab === "events") {
    fetch("http://localhost:5000/api/events")
    .then(res => res.json())
    .then(setEvents);
    }
    if (tab === "coordinators") {
  fetch("http://localhost:5000/api/coordinators")
    .then(res => res.json())
    .then(setCoordinators);
}

    
}, [tab, loggedIn]);

  /* ➕ ADD NEWS */
  const handleNewsSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("category", category);
    if (image) fd.append("image", image);

    const res = await fetch("http://localhost:5000/api/news", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) return alert("❌ News upload failed");

    alert("✅ News added");
    setTitle("");
    setContent("");
    setImage(null);
  };

  /* ➕ ADD MAGAZINE WITH COVER IMAGE */
const handleMagazineSubmit = async (e) => {
  e.preventDefault();

  if (!magTitle || !magPdf || !magCover) {
    return alert("❌ Title, PDF and Cover Image are required");
  }

  const fd = new FormData();
  fd.append("title", magTitle);
  fd.append("pdf", magPdf);        // magazine PDF
  fd.append("cover", magCover);    // cover image

  try {
    const res = await fetch("http://localhost:5000/api/magazines", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error();

    alert("✅ Magazine uploaded successfully");
    setMagTitle("");
    setMagPdf(null);
    setMagCover(null);
  } catch (err) {
    alert("❌ Magazine upload failed");
  }
};

  /* ➕ ADD STORY */
  const handleStorySubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", storyTitle);
  formData.append("author", storyAuthor);
  formData.append("description", storyDesc);
  formData.append("pdf", storyPdf);
  formData.append("image", storyImage); // 👈 NEW

  try {
    const res = await fetch("http://localhost:5000/api/stories", {
      method: "POST",
      body: formData,
    });
    
  
    if (!res.ok) throw new Error();



    alert("✅ Story uploaded");

    setStoryTitle("");
    setStoryAuthor("");
    setStoryDesc("");
    setStoryPdf(null);
    setStoryImage(null);
  } catch (err) {
    alert("❌ Story upload failed");
  }
};

 /* ➕ EVENT */
  const handleEventSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("title", eventTitle);
  fd.append("description", eventDesc);
  fd.append("event_type", eventType);
  fd.append("status", eventStatus);
  fd.append("event_date", eventDate);

  if (eventImage) {
    fd.append("cover_image", eventImage); // 🔥 MUST MATCH BACKEND
  }

  try {
    const res = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      body: fd, // ❌ NO HEADERS
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "❌ Event upload failed");
      return;
    }

    alert("✅ Event added successfully");

    // reset
    setEventTitle("");
    setEventDesc("");
    setEventDate("");
    setEventImage(null);

    // reload list
    setEvents(prev => [...prev, data.event || {}]);

  } catch (err) {
    console.error(err);
    alert("❌ Server error");
  }
};
/* ➕ ADD COORDINATOR */
const handleCoordinatorSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("name", coordName);
  fd.append("domain", coordDomain);
  fd.append("branch", coordBranch);
  fd.append("year", coordYear);
  if (coordImage) fd.append("image", coordImage);

const url = editingId
  ? `http://localhost:5000/api/coordinators/${editingId}`
  : "http://localhost:5000/api/coordinators";


  const method = editingId ? "PUT" : "POST";

  try {
    const res = await fetch(url, { method, body: fd });
    if (!res.ok) throw new Error();

    alert(editingId ? "✅ Coordinator updated" : "✅ Coordinator added");

    setEditingId(null);
    setCoordName("");
    setCoordDomain("overall");
    setCoordBranch("");
    setCoordYear("");
    setCoordImage(null);

    fetch("http://localhost:5000/api/coordinators")
      .then(res => res.json())
      .then(setCoordinators);

  } catch {
    alert("❌ Failed to save coordinator");
  }
};




  /* 🗑 DELETE HANDLERS */
  const deleteItem = async (url, id, setter) => {
  if (!window.confirm("Delete this item?")) return;

  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "❌ Delete failed");
      return;
    }

    alert(data.message || "✅ Deleted successfully");

    // update UI ONLY after success
    setter(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error(err);
    alert("❌ Server error while deleting");
  }
};


if (!loggedIn) {
  return (
    <div className="container">
      <h2>Admin Login</h2>

      {otpStep === 1 && (
        <>
          <p>Receive OTP on admin email</p>
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {otpStep === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {otpMsg && <p>{otpMsg}</p>}
    </div>
  );
}

  /* 🧑‍💻 DASHBOARD */
  return (
    <div className="container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button
  className="logout-btn"
  onClick={() => {
    sessionStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
  }}
>
  Logout
</button>

      </div>

      <div className="admin-tabs">
        <button className={tab === "news" ? "active" : ""} onClick={() => setTab("news")}>News</button>
        <button className={tab === "magazines" ? "active" : ""} onClick={() => setTab("magazines")}>Magazines</button>
        <button className={tab === "stories" ? "active" : ""} onClick={() => setTab("stories")}>Stories</button>
        <button className={tab === "breaking" ? "active" : ""} onClick={() => setTab("breaking")}> Breaking News</button>
        <button className={tab === "events" ? "active" : ""} onClick={() => setTab("events")}> Events</button>
        <button
  className={tab === "coordinators" ? "active" : ""}
  onClick={() => setTab("coordinators")}
>
  Coordinators
</button>

      </div>

      {/* 📰 NEWS */}
      {tab === "news" && (
        <>
          <h3>Add News</h3>
          <form className="admin-form" onSubmit={handleNewsSubmit}>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="technical">Technical</option>
              <option value="non-technical">Non-Technical</option>
            </select>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            <textarea placeholder="Content" rows="4" value={content} onChange={e => setContent(e.target.value)} required />
            <button type="submit">Publish News</button>
          </form>

          <h3>Published News</h3>
          {newsList.map(n => (
            <div className="admin-item" key={n.id}>
              <span>{n.title}</span>
              <button className="delete-btn"
                onClick={() => deleteItem("http://localhost:5000/api/news", n.id, setNewsList)}>
                Delete
              </button>
            </div>
          ))}
        </>
      )}

{/* 📘 MAGAZINES */}
{tab === "magazines" && (
  <>
    <h3>Add Magazine</h3>

    <form className="admin-form" onSubmit={handleMagazineSubmit}>
      <input
        placeholder="Magazine Title"
        value={magTitle}
        onChange={(e) => setMagTitle(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setMagCover(e.target.files[0])}
        required
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setMagPdf(e.target.files[0])}
        required
      />

      <button type="submit">Publish Magazine</button>
    </form>

    <h3>Published Magazines</h3>

    {magazines.map((m) => (
      <div className="admin-item" key={m.id}>
        <span>{m.title}</span>

        <button
          className="delete-btn"
          onClick={() =>
            deleteItem(
              "http://localhost:5000/api/magazines",
              m.id,
              setMagazines
            )
          }
        >
          Delete
        </button>
      </div>
    ))}
  </>
)}


      {/* 📄 STORIES */}
      {tab === "stories" && (
  <>
    <h3>Add Story</h3>

    <form className="admin-form" onSubmit={handleStorySubmit}>
      <input
        placeholder="Story Title"
        value={storyTitle}
        onChange={(e) => setStoryTitle(e.target.value)}
        required
      />

      <input
        placeholder="Author"
        value={storyAuthor}
        onChange={(e) => setStoryAuthor(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        rows="3"
        value={storyDesc}
        onChange={(e) => setStoryDesc(e.target.value)}
        required
      />

      {/* 🔹 NEW: STORY THUMBNAIL */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setStoryImage(e.target.files[0])}
        required
      />

      {/* 🔹 STORY PDF */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setStoryPdf(e.target.files[0])}
        required
      />

      <button type="submit">Publish Story</button>
    </form>

    <h3>Published Stories</h3>

    {stories.length === 0 ? (
      <p>No stories published yet.</p>
    ) : (
      stories.map((s) => (
        <div className="admin-item" key={s.id}>
          <span>
            <strong>{s.title}</strong> — {s.author}
          </span>

          <button
            className="delete-btn"
            onClick={() =>
              deleteItem(
                "http://localhost:5000/api/stories",
                s.id,
                setStories
              )
            }
          >
            Delete
          </button>
        </div>
      ))
    )}
  </>
)}


  {tab === "breaking" && (
  <>
    <h3>Breaking News</h3>

    <form
      className="admin-form"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          const res = await fetch("http://localhost:5000/api/breaking-news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: breakingText,
              is_active: showBreaking
            }),
          });

          if (!res.ok) throw new Error();
          alert("✅ Breaking news updated");
        } catch {
          alert("❌ Failed to update breaking news");
        }
      }}
    >
      <textarea
        placeholder="Breaking news text"
        value={breakingText}
        onChange={(e) => setBreakingText(e.target.value)}
        required
      />

      <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={showBreaking}
          onChange={(e) => setShowBreaking(e.target.checked)}
        />
        Display Breaking News
      </label>

      <button type="submit">Update Breaking News</button>
    </form>
  </>
)}


{tab === "events" && (
  <>
    <h3>Add Event</h3>

    <form className="admin-form" onSubmit={handleEventSubmit}>
      <input
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Event Description"
        rows="3"
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
        required
      />

      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
      >
        <option value="technical">Technical</option>
        <option value="non-technical">Non-Technical</option>
      </select>

      <select
        value={eventStatus}
        onChange={(e) => setEventStatus(e.target.value)}
      >
        <option value="upcoming">Upcoming</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />

      {/* ✅ EVENT IMAGE (REQUIRED FOR MULTER) */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEventImage(e.target.files[0])}
      />

      <button type="submit">Publish Event</button>
    </form>

    <h3>Published Events</h3>

    {events.length === 0 && <p>No events added yet.</p>}

    {events.map((ev) => (
      <div className="admin-item" key={ev.id}>
        <span>
          <strong>{ev.title}</strong> — {ev.event_type} ({ev.status})
        </span>

        {ev.cover_image && (
          <img
            src={`http://localhost:5000${ev.cover_image}`}
            alt={ev.title}
            style={{
              width: "60px",
              height: "40px",
              objectFit: "cover",
              marginLeft: "10px",
            }}
          />
        )}

      <button
  className="delete-btn"
  onClick={() =>
    deleteItem(
      "http://localhost:5000/api/events",
      ev.id,
      setEvents
    )
  }
>
  Delete
</button>


      </div>
    ))}
  </>
)}

{tab === "coordinators" && (
  <>
    <h3>Add Student Coordinator</h3>

    <form className="admin-form" onSubmit={handleCoordinatorSubmit}>
      <input
        placeholder="Name"
        value={coordName}
        onChange={(e) => setCoordName(e.target.value)}
        required
      />

      <select
        value={coordDomain}
        onChange={(e) => setCoordDomain(e.target.value)}
      >
        <option value="overall">Overall</option>
        <option value="web">Web</option>
        <option value="editing">Editing</option>
        <option value="data">Data</option>
        <option value="anchoring">Anchoring</option>
      </select>

      <input
        placeholder="Branch"
        value={coordBranch}
        onChange={(e) => setCoordBranch(e.target.value)}
        required
      />

      <input
        placeholder="Year"
        value={coordYear}
        onChange={(e) => setCoordYear(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoordImage(e.target.files[0])}
        required
      />

      <button type="submit">
  {editingId ? "Update Coordinator" : "Add Coordinator"}
</button>
{editingId && (
  <button
    type="button"
    className="cancel-btn"
    onClick={() => {
      setEditingId(null);
      setCoordName("");
      setCoordDomain("overall");
      setCoordBranch("");
      setCoordYear("");
      setCoordImage(null);
    }}
  >
    Cancel Edit
  </button>
)}


    </form>

    <h3>Published Coordinators</h3>

    {coordinators.map(c => (
      <div className="admin-item" key={c.id}>
        <span>
          <strong>{c.name}</strong> — {c.domain}
        </span>

        <img
          src={`http://localhost:5000${c.image}`}
          alt={c.name}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
            marginLeft: "10px"
          }}
        />

        <button
  className="edit-btn"
  onClick={() => {
    setEditingId(c.id);
    setCoordName(c.name);
    setCoordDomain(c.domain);
    setCoordBranch(c.branch);
    setCoordYear(c.year);
    setCoordImage(null);
  }}
>
  Edit
</button>

<button
  className="delete-btn"
  onClick={() =>
    deleteItem(
      "http://localhost:5000/api/coordinators",
      c.id,
      setCoordinators
    )
  }
>
  Delete
</button>

      </div>
    ))}
  </>
)}





    </div>
  );

  

}
export default Admin;