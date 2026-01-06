import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, cancelBooking } from '../utils/storage';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getBookings();
    setBookings(allBookings);
  };

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      const success = cancelBooking(bookingId);
      if (success) {
        loadBookings();
        alert('Booking cancelled successfully!');
      } else {
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    const eventDate = new Date(booking.event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'upcoming') {
      return eventDate >= today;
    }
    if (filter === 'past') {
      return eventDate < today;
    }
    return true;
  });

  const getTypeLabel = (type) => {
    const labels = {
      movie: 'Movie',
      bus: 'Bus',
      train: 'Train',
      concert: 'Concert'
    };
    return labels[type] || type;
  };

  const isPastEvent = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  if (bookings.length === 0) {
    return (
      <div className="my-bookings">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p className="subtitle">Manage your ticket bookings</p>
        </div>
        <div className="no-bookings">
          <div className="no-bookings-icon">🎫</div>
          <h2>No Bookings Yet</h2>
          <p>You haven't made any bookings yet. Start exploring events!</p>
          <Link to="/" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p className="subtitle">Manage your ticket bookings</p>
      </div>

      <div className="bookings-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming ({bookings.filter(b => !isPastEvent(b.event.date)).length})
        </button>
        <button
          className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          Past ({bookings.filter(b => isPastEvent(b.event.date)).length})
        </button>
      </div>

      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="no-filtered-bookings">
            <p>No bookings found matching your filter.</p>
          </div>
        ) : (
          filteredBookings.map(booking => {
            const isPast = isPastEvent(booking.event.date);
            return (
              <div key={booking.bookingId} className={`booking-card ${isPast ? 'past-event' : ''}`}>
                <div className="booking-card-header">
                  <div className="booking-type-badge">
                    <span className="type-icon">{booking.event.image}</span>
                    <span className="type-label">{getTypeLabel(booking.event.type)}</span>
                  </div>
                  {isPast && <span className="past-badge">Past Event</span>}
                </div>

                <div className="booking-card-body">
                  <h3 className="booking-title">{booking.event.title}</h3>
                  
                  <div className="booking-details-grid">
                    <div className="detail-group">
                      <span className="detail-label">📅 Date</span>
                      <span className="detail-value">
                        {new Date(booking.event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">🕐 Time</span>
                      <span className="detail-value">{booking.event.time}</span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">📍 Venue</span>
                      <span className="detail-value">{booking.event.venue}</span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">💺 Seats</span>
                      <span className="detail-value seats">{booking.seats.join(', ')}</span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">💰 Total</span>
                      <span className="detail-value price">${booking.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">🆔 Booking ID</span>
                      <span className="detail-value booking-id">{booking.bookingId}</span>
                    </div>
                  </div>

                  <div className="booking-meta">
                    <div className="meta-item">
                      <span className="meta-label">Booked on:</span>
                      <span className="meta-value">
                        {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Customer:</span>
                      <span className="meta-value">{booking.customerName}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-card-actions">
                  <Link 
                    to={`/ticket/${booking.bookingId}`}
                    className="btn-primary"
                  >
                    View E-Ticket
                  </Link>
                  {!isPast && (
                    <button
                      className="btn-danger"
                      onClick={() => handleCancel(booking.bookingId)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyBookings;

