import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import { saveBooking } from '../utils/storage';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="event-details">
        <div className="error-message">Event not found</div>
      </div>
    );
  }

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert('Maximum 10 seats can be selected at once');
      }
    }
  };

  const handleBookTickets = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (!customerName.trim() || !customerEmail.trim()) {
      alert('Please fill in all customer details');
      return;
    }

    const booking = {
      event: event,
      seats: selectedSeats.sort((a, b) => a - b),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      totalPrice: selectedSeats.length * event.price
    };

    const savedBooking = saveBooking(booking);
    navigate(`/ticket/${savedBooking.bookingId}`);
  };

  const generateSeatNumbers = (totalSeats) => {
    const seats = [];
    const rows = Math.ceil(totalSeats / 10);
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(i);
    }
    return seats;
  };

  const isSeatAvailable = (seatNumber) => {
    return seatNumber <= event.availableSeats;
  };

  const isSeatSelected = (seatNumber) => {
    return selectedSeats.includes(seatNumber);
  };

  const seats = generateSeatNumbers(event.totalSeats);

  return (
    <div className="event-details">
      <div className="details-container">
        <div className="event-header">
          <div className="event-icon-large">{event.image}</div>
          <div className="event-header-info">
            <h1>{event.title}</h1>
            <p className="event-category">{event.category}</p>
            <p className="event-description">{event.description}</p>
          </div>
        </div>

        <div className="event-info-grid">
          <div className="info-card">
            <h3>Event Details</h3>
            <div className="info-item">
              <span className="info-label">📅 Date:</span>
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🕐 Time:</span>
              <span>{event.time}</span>
            </div>
            <div className="info-item">
              <span className="info-label">📍 Venue:</span>
              <span>{event.venue}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🌍 Location:</span>
              <span>{event.location}</span>
            </div>
            <div className="info-item">
              <span className="info-label">💰 Price per seat:</span>
              <span className="price-large">${event.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>Availability</h3>
            <div className="availability-info">
              <div className="availability-stat">
                <span className="stat-value">{event.availableSeats}</span>
                <span className="stat-label">Available Seats</span>
              </div>
              <div className="availability-stat">
                <span className="stat-value">{event.totalSeats - event.availableSeats}</span>
                <span className="stat-label">Booked Seats</span>
              </div>
              <div className="availability-stat">
                <span className="stat-value">{event.totalSeats}</span>
                <span className="stat-label">Total Seats</span>
              </div>
            </div>
          </div>
        </div>

        <div className="seat-selection-section">
          <h2>Select Your Seats</h2>
          <p className="selection-info">
            Selected: {selectedSeats.length} seat(s) - Total: ${(selectedSeats.length * event.price).toFixed(2)}
          </p>
          
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-seat available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat unavailable"></div>
              <span>Unavailable</span>
            </div>
          </div>

          <div className="seats-grid">
            {seats.map(seatNum => {
              const available = isSeatAvailable(seatNum);
              const selected = isSeatSelected(seatNum);
              
              return (
                <button
                  key={seatNum}
                  className={`seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''}`}
                  onClick={() => available && handleSeatClick(seatNum)}
                  disabled={!available}
                >
                  {seatNum}
                </button>
              );
            })}
          </div>

          {selectedSeats.length > 0 && (
            <button 
              className="btn-primary proceed-btn"
              onClick={() => setShowBookingForm(true)}
            >
              Proceed to Booking ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
            </button>
          )}
        </div>

        {showBookingForm && (
          <div className="booking-form-overlay" onClick={() => setShowBookingForm(false)}>
            <div className="booking-form" onClick={(e) => e.stopPropagation()}>
              <h2>Customer Information</h2>
              <form onSubmit={handleBookTickets}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="booking-summary">
                  <h3>Booking Summary</h3>
                  <div className="summary-item">
                    <span>Event:</span>
                    <span>{event.title}</span>
                  </div>
                  <div className="summary-item">
                    <span>Seats:</span>
                    <span>{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="summary-item">
                    <span>Quantity:</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount:</span>
                    <span>${(selectedSeats.length * event.price).toFixed(2)}</span>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowBookingForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;

