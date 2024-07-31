import React from 'react';
import './SelectedEventList.css';

const SelectedEventList = ({ events, onDeselect }) => (
  <div className="selected-events">
    <h2>Selected Events</h2>
    {events.length === 0 ? (
      <p>No events selected.</p>
    ) : (
      events.map(event => (
        <div key={event.id} className="selected-event">
          <div className="event-info">
            <h4 className="event-name">{event.event_name}</h4>
            <p className="event-timings">
              {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
            </p>
            <button onClick={() => onDeselect(event)} className="deselect-button">
            Deselect
          </button>
          </div>
          
        </div>
      ))
    )}
  </div>
);

export default SelectedEventList;
