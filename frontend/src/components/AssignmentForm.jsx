import { useState } from "react";

function AssignmentForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onCreate({ title, course, due_date: dueDate, description });
    setTitle("");
    setCourse("");
    setDueDate("");
    setDescription("");
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Add Assignment</h2>

      <input
        type="text"
        placeholder="Assignment title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course (e.g. CSC 101)"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Assignment</button>
    </form>
  );
}

export default AssignmentForm;