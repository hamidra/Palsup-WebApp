import React from 'react';
import EventModal from './modals/EventModal';

const EventsPanel = ({ events, handleLikeClick }) =>
  events && (
    <div className="row justify-content-center">
      {Object.keys(events).map(
        eventId =>
          eventId &&
          events[eventId] && (
            <EventModal
              key={events[eventId].id}
              event={events[eventId]}
              handleLikeClick={handleLikeClick}
            />
          )
      )}
    </div>
  );

export default EventsPanel;
