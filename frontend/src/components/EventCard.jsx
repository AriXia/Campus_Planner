function EventCard({ event, onDelete }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Description:</strong> {event.description || "No description"}
      </p>

      <button className="delete-button" onClick={() => onDelete(event.id)}>
        Delete
      </button>
    </div>
  );
}

export default EventCard;