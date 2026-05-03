function AssignmentCard({ assignment, onDelete, onComplete }) {
  return (
    <div className="event-card">
      <h3>{assignment.title}</h3>
      <p><strong>Course:</strong> {assignment.course}</p>
      <p><strong>Due:</strong> {assignment.due_date}</p>
      <p><strong>Description:</strong> {assignment.description || "No description"}</p>
      <p><strong>Status:</strong> {assignment.completed ? "✅ Completed" : "⏳ Pending"}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {!assignment.completed && (
          <button
            className="delete-button"
            style={{ background: "#d1fae5", color: "#065f46" }}
            onClick={() => onComplete(assignment.id)}
          >
            Mark Complete
          </button>
        )}
        <button className="delete-button" onClick={() => onDelete(assignment.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default AssignmentCard;