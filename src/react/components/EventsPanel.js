import React from 'react';
import EventCard from './cards/EventCard';

const EventsPanel = ({ events }) => (
  <div className="row justify-content-center">
    {Object.keys(events).map(eventId => {
      if (eventId) {
        return <EventCard event={events[eventId]} key={events[eventId].id} />;
      }
    })}
  </div>
);

export default EventsPanel;
