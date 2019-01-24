import React from 'react';
import EventCard from './cards/EventCard';

const EventsPanel = ({ events }) => (
  <div className="row justify-content-center">
    {events.map((event, index) => (
      <EventCard event={event} key={event.id || index} />
    ))}
  </div>
);

export default EventsPanel;
