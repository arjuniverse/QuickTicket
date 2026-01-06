import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventListing from './components/EventListing';
import EventDetails from './components/EventDetails';
import ETicket from './components/ETicket';
import MyBookings from './components/MyBookings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">QuickTicket</span>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Events</Link>
              <Link to="/bookings" className="nav-link">My Bookings</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<EventListing />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/ticket/:bookingId" element={<ETicket />} />
            <Route path="/bookings" element={<MyBookings />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 QuickTicket. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

