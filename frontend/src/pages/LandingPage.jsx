import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <div className="landing-card">
        <div className="landing-icon">
          <img src="/ccny_logo.jpeg" alt="CCNY Logo" className="landing-logo" />
        </div>
        <h1 className="landing-title">CCNY CAMPUS PLANNER</h1>
        <div className="landing-divider" />
        <p className="landing-subtitle">
          A unified space for CCNY students to manage academic assignments
          and discover campus events. Simplify your student life.
        </p>
        <div className="landing-buttons">
          <button
            className="landing-btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;