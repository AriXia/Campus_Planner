import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAll() {
      try {
        const [eventsRes, assignmentsRes] = await Promise.all([
          fetch("http://127.0.0.1:5001/events"),
          fetch("http://127.0.0.1:5001/assignments"),
        ]);
        const eventsData = await eventsRes.json();
        const assignmentsData = await assignmentsRes.json();
        setEvents(eventsData);
        setAssignments(assignmentsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const pendingAssignments = assignments.filter((a) => !a.completed);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's coming up.</p>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="dashboard-grid">

          {/* Assignments Panel */}
          <div className="events-list-panel">
            <div className="dashboard-panel-header">
              <h2>Pending Assignments</h2>
              <button className="dashboard-nav-btn" onClick={() => navigate("/assignments")}>
                View All
              </button>
            </div>

            {pendingAssignments.length === 0 && (
              <p>No pending assignments. Great job! 🎉</p>
            )}

            {pendingAssignments.slice(0, 3).map((a) => (
              <div className="dashboard-item" key={a.id}>
                <div>
                  <strong>{a.title}</strong>
                  <p className="dashboard-sub">{a.course} — Due: {a.due_date}</p>
                </div>
                <span className="badge badge-pending">Pending</span>
              </div>
            ))}
          </div>

          {/* Events Panel */}
          <div className="events-list-panel">
            <div className="dashboard-panel-header">
              <h2>Upcoming Events</h2>
              <button className="dashboard-nav-btn" onClick={() => navigate("/events")}>
                View All
              </button>
            </div>

            {events.length === 0 && <p>No upcoming events.</p>}

            {events.slice(0, 3).map((e) => (
              <div className="dashboard-item" key={e.id}>
                <div>
                  <strong>{e.title}</strong>
                  <p className="dashboard-sub">{e.location} — {e.date}</p>
                </div>
                <span className="badge badge-event">Event</span>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

export default DashboardPage;