import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import './EventListing.css';

const EventListing = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeLabel = (type) => {
    const labels = {
      movie: 'Movies',
      bus: 'Buses',
      train: 'Trains',
      concert: 'Concerts'
    };
    return labels[type] || type;
  };

  return (
    <div className="event-listing">
      <div className="listing-header">
        <h1>Browse Events</h1>
        <p className="subtitle">Book your tickets for movies, concerts, buses, and trains</p>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button
            className={`filter-btn ${filter === 'movie' ? 'active' : ''}`}
            onClick={() => setFilter('movie')}
          >
            🎬 Movies
          </button>
          <button
            className={`filter-btn ${filter === 'bus' ? 'active' : ''}`}
            onClick={() => setFilter('bus')}
          >
            🚌 Buses
          </button>
          <button
            className={`filter-btn ${filter === 'train' ? 'active' : ''}`}
            onClick={() => setFilter('train')}
          >
            🚄 Trains
          </button>
          <button
            className={`filter-btn ${filter === 'concert' ? 'active' : ''}`}
            onClick={() => setFilter('concert')}
          >
            🎵 Concerts
          </button>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <Link to={`/event/${event.id}`} key={event.id} className="event-card">
              <div className="event-image">{event.image}</div>
              <div className="event-info">
                <div className="event-type">{getTypeLabel(event.type)}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">📅 Date:</span>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🕐 Time:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📍 Venue:</span>
                    <span>{event.venue}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">💰 Price:</span>
                    <span className="price">${event.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="availability">
                  <span className={`availability-badge ${event.availableSeats > 20 ? 'available' : 'limited'}`}>
                    {event.availableSeats > 20 ? '✓ Available' : '⚠ Limited Seats'}
                  </span>
                  <span className="seats-count">{event.availableSeats} seats left</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventListing;

