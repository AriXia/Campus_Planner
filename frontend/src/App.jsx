import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:5000/events");
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const response = await fetch("http://127.0.0.1:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          location,
          date,
          description
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      setTitle("");
      setLocation("");
      setDate("");
      setDescription("");

      loadEvents();
    } catch (err) {
      setError("Could not create event.");
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      setError("");

      const response = await fetch(`http://127.0.0.1:5000/events/${id}`, {
        method: "DELETE"
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
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>CCNY Campus Planner</h1>
      <h2>Events</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px", minHeight: "100px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Create Event
        </button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}
      {!loading && events.length === 0 && <p>No events yet.</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "8px"
          }}
        >
          <h3>{event.title}</h3>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Description:</strong> {event.description || "No description"}</p>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;