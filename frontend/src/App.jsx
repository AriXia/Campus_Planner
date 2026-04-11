import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";
import "./App.css";

function PlaceholderPage({ title, text }) {
  return (
    <div className="page-container">
      <div className="page-card">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PlaceholderPage
              title="Dashboard"
              text="Dashboard coming next. For now, use the Events page."
            />
          }
        />
        <Route
          path="/assignments"
          element={
            <PlaceholderPage
              title="Assignments"
              text="Assignments page coming next."
            />
          }
        />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
}

export default App;