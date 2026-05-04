import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import EventsPage from "./pages/EventsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/*"
        element={
          <div className="app-shell">
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/events" element={<EventsPage />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
}

export default App;