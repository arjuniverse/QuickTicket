import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { getBookingById } from '../utils/storage';
import './ETicket.css';

const ETicket = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const bookingData = getBookingById(bookingId);
    setBooking(bookingData);
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="eticket">
        <div className="error-message">
          <h2>Ticket Not Found</h2>
          <p>The booking ID you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">Back to Events</Link>
        </div>
      </div>
    );
  }

  const { event, seats, customerName, customerEmail, bookingId: id, bookingDate, totalPrice } = booking;
  const qrData = JSON.stringify({
    bookingId: id,
    event: event.title,
    seats: seats.join(', '),
    customerName,
    date: event.date,
    time: event.time
  });

  return (
    <div className="eticket">
      <div className="eticket-container">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your e-ticket has been generated successfully</p>
        </div>

        <div className="ticket-card">
          <div className="ticket-header">
            <div className="ticket-logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">QuickTicket</span>
            </div>
            <div className="ticket-type">{event.type.toUpperCase()}</div>
          </div>

          <div className="ticket-body">
            <div className="ticket-left">
              <div className="ticket-section">
                <h3>Event Details</h3>
                <div className="ticket-info">
                  <div className="info-row">
                    <span className="label">Event:</span>
                    <span className="value">{event.title}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Time:</span>
                    <span className="value">{event.time}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Venue:</span>
                    <span className="value">{event.venue}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Location:</span>
                    <span className="value">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="ticket-section">
                <h3>Seat Information</h3>
                <div className="ticket-info">
                  <div className="info-row">
                    <span className="label">Seats:</span>
                    <span className="value seats-value">{seats.join(', ')}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Quantity:</span>
                    <span className="value">{seats.length} seat{seats.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="ticket-section">
                <h3>Customer Information</h3>
                <div className="ticket-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{customerName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{customerEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ticket-right">
              <div className="qr-section">
                <h3>Scan QR Code</h3>
                <div className="qr-container">
                  <QRCodeSVG value={qrData} size={200} level="H" />
                </div>
                <p className="qr-note">Present this QR code at the venue</p>
              </div>

              <div className="booking-id-section">
                <div className="booking-id">
                  <span className="id-label">Booking ID</span>
                  <span className="id-value">{id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <div className="price-section">
              <span className="price-label">Total Amount Paid</span>
              <span className="price-value">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="booking-date">
              Booked on: {new Date(bookingDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        <div className="ticket-actions">
          <button 
            className="btn-secondary print-btn"
            onClick={() => window.print()}
          >
            🖨️ Print Ticket
          </button>
          <Link to="/bookings" className="btn-primary">
            View My Bookings
          </Link>
          <Link to="/" className="btn-secondary">
            Browse More Events
          </Link>
        </div>

        <div className="ticket-notes">
          <h4>Important Notes:</h4>
          <ul>
            <li>Please arrive at least 30 minutes before the event time</li>
            <li>Bring a valid ID matching the name on the ticket</li>
            <li>Keep this ticket safe - you'll need it for entry</li>
            <li>In case of cancellation, please cancel at least 24 hours before the event</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ETicket;

