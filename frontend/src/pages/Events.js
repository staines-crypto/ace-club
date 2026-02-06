import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Events.css";

function Events() {
  const { type } = useParams(); // technical | non-technical
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "http://localhost:5000/api/events";

    // FILTER BY EVENT TYPE
    if (type) {
      url = `http://localhost:5000/api/events/filter?event_type=${type}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("EVENT FETCH ERROR:", err);
        setLoading(false);
      });
  }, [type]);

  const upcoming = events.filter(e => e.status === "upcoming");
  const completed = events.filter(e => e.status === "completed");

  if (loading) {
    return <p className="loading">Loading events...</p>;
  }

  return (
    <div className="container events-page">
      <h2 className="events-title">Events</h2>

      {/* UPCOMING EVENTS */}
      <section className="event-section">
        <h3>Upcoming Events</h3>

        {upcoming.length === 0 && (
          <p className="no-events">No upcoming events</p>
        )}

        <div className="events-list">
          {upcoming.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* COMPLETED EVENTS */}
      <section className="event-section">
        <h3>Completed Events</h3>

        {completed.length === 0 && (
          <p className="no-events">No completed events</p>
        )}

        <div className="events-list">
          {completed.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================
   EVENT CARD
========================= */
function EventCard({ event }) {
  return (
    <div className="event-row">
      {/* LEFT SIDE */}
      <div className="event-info">
        <h4 className="event-title">{event.title}</h4>

        <p className="event-type">{event.event_type}</p>

        <div className="event-meta">
          <span>📅 {new Date(event.event_date).toDateString()}</span>
        </div>

        <div className="event-tags">
          <span className="tag">{event.event_type}</span>
          <span className={`status ${event.status}`}>
            {event.status}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="event-logo">
        {event.cover_image && (
          <img
            src={`http://localhost:5000${event.cover_image}`}
            alt={event.title}
          />
        )}
      </div>
    </div>
  );
}

export default Events;
