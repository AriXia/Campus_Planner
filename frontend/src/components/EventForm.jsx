import { useState } from "react";

function EventForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await onCreate({
      title,
      location,
      date,
      description,
    });

    setTitle("");
    setLocation("");
    setDate("");
    setDescription("");
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Create Event</h2>

      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;