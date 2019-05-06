import React from 'react';
import Circle from '../components/icons/circle';

const EventTab = ({ event, active, handleEventClick }) =>
  event && (
    <button
      className={`list-group-item list-group-item-action border-top ${active &&
        'active'}`}
      onClick={() => handleEventClick(event.id)}>
      <div className="row">
        <div className="col-10">
          <h5>{event.activity}</h5>
          <p>{event.description}</p>
        </div>
        <div className="col-2 align-start">
          {event.notificationCount > 0 && (
            <Circle className="notification-circle" />
          )}
        </div>
      </div>
    </button>
  );

export default EventTab;
