import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        <img src="/ccny_logo.jpeg" alt="CCNY Logo" className="navbar-logo" />
        CCNY Campus Planner
      </div>
      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/assignments"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Assignments
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Events
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;