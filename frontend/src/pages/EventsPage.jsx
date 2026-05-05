import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:5001/events");
      if (!response.ok) {
        throw new Error("Failed to load events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError("Could not load events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function handleCreate(newEvent) {
    try {
      setError("");

      const response = await fetch("http://127.0.0.1:5001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      loadEvents();
    } catch (err) {
      setError("Could not create event.");
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      setError("");

      const response = await fetch(`http://127.0.0.1:5001/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      loadEvents();
    } catch (err) {
      setError("Could not delete event.");
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Campus Events</h1>
        <p>Manage campus events and keep students informed.</p>
      </div>

      <div className="events-layout">
        <EventForm onCreate={handleCreate} />

        <div className="events-list-panel">
          <h2>Upcoming Events</h2>

          {loading && <p>Loading events...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && events.length === 0 && <p>No events yet.</p>}

          <div className="events-list">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;