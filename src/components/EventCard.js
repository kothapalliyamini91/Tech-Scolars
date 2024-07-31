import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onSelect, selected }) => (
  <div className={`event-card ${selected ? 'selected' : ''}`}>
    <div className="event-card-content">
      <h3 className="event-title">{event.event_name}</h3>
      <p className="event-category">{event.event_category}</p>
      <p className="event-timings">
        {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
      </p>
    </div>
    <button 
      onClick={() => onSelect(event)} 
      disabled={selected} 
      className={`select-button ${selected ? 'disabled' : ''}`}
    >
      {selected ? 'Selected' : 'Select'}
    </button>
  </div>
);

export default EventCard;
