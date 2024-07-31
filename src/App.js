import React, { useState, useEffect } from 'react';
import EventCard from './components/EventCard';
import SelectedEventList from './components/SelectedEventList';
import mockData from './data/mockData.json';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    setEvents(mockData)
    const savedEvents = JSON.parse(localStorage.getItem('selectedEvents')) || [];
    setSelectedEvents(savedEvents);
  }, []);
  const isConflicting = (event1, event2) => {
    const start1 = new Date(event1.start_time);
    const end1 = new Date(event1.end_time);
    const start2 = new Date(event2.start_time);
    const end2 = new Date(event2.end_time);
    return (start1 < end2 && start2 < end1);
  };

  const handleSelectEvent = event => {
    if (selectedEvents.length >= 3 || selectedEvents.some(e => e.id === event.id)) return;
    if (selectedEvents.some(e => isConflicting(e, event))) return;
    const updatedSelectedEvents = [...selectedEvents, event];
    localStorage.setItem('selectedEvents', JSON.stringify(updatedSelectedEvents));
    setSelectedEvents(updatedSelectedEvents);
  };

  const handleDeselectEvent = event => {
    // Filter out the deselected event from the list
    const updatedSelectedEvents = selectedEvents.filter(e => e.id !== event.id);
    // Update the state with the new list
    setSelectedEvents(updatedSelectedEvents);
    // Update localStorage with the new list of selected events
    localStorage.setItem('selectedEvents', JSON.stringify(updatedSelectedEvents));
  };
  

  return (
    <div className="app">
      <div className="event-list">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={handleSelectEvent} 
            selected={selectedEvents.some(e => e.id === event.id)}
          />
        ))}
      </div>
      <SelectedEventList events={selectedEvents} onDeselect={handleDeselectEvent} />
    </div>
  );
};

export default App;
