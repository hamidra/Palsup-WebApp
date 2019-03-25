import React from 'react';
import EventModal from './modals/EventModal';

const EventsPanel = ({ events }) => (
  <div className="row justify-content-center">
    {Object.keys(events).map(eventId => {
      if (eventId && events[eventId]) {
        return <EventModal key={events[eventId].id} event={events[eventId]} />;
      }
    })}
  </div>
);

export default EventsPanel;
