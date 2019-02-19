import React from 'react';
import EventCard from './cards/EventCard';
import EventModal from './modals/EventModal';

const EventsPanel = ({ events }) => (
  <div className="row justify-content-center">
    {Object.keys(events).map(eventId => {
      if (eventId) {
        const modalId = `Modal_${eventId}`;
        return (
          <div>
            <EventCard
              modalId={modalId}
              event={events[eventId]}
              key={events[eventId].id}
            />
            <EventModal modalId={modalId} event={events[eventId]} />
          </div>
        );
      }
    })}
  </div>
);

export default EventsPanel;
