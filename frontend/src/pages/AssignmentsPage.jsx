import { useEffect, useState } from "react";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentCard from "../components/AssignmentCard";

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAssignments() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://127.0.0.1:5000/assignments");
      if (!response.ok) throw new Error("Failed to load assignments");
      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      setError("Could not load assignments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  async function handleCreate(newAssignment) {
    try {
      setError("");
      const response = await fetch("http://127.0.0.1:5000/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });
      if (!response.ok) throw new Error("Failed to create assignment");
      loadAssignments();
    } catch (err) {
      setError("Could not create assignment.");
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      const response = await fetch(`http://127.0.0.1:5000/assignments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete assignment");
      loadAssignments();
    } catch (err) {
      setError("Could not delete assignment.");
      console.error(err);
    }
  }

  async function handleComplete(id) {
    try {
      setError("");
      const response = await fetch(
        `http://127.0.0.1:5000/assignments/${id}/complete`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Failed to mark complete");
      loadAssignments();
    } catch (err) {
      setError("Could not mark assignment complete.");
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Assignments</h1>
        <p>Track your coursework and due dates.</p>
      </div>

      <div className="events-layout">
        <AssignmentForm onCreate={handleCreate} />

        <div className="events-list-panel">
          <h2>Your Assignments</h2>

          {loading && <p>Loading assignments...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && assignments.length === 0 && <p>No assignments yet.</p>}

          <div className="events-list">
            {assignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentsPage;