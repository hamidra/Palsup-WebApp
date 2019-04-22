import React from 'react';
import Circle from '../components/icons/circle';

const EventTab = ({ event, active }) =>
  event && (
    <a
      className={`list-group-item list-group-item-action border-top ${active &&
        'active'}`}
      href={`/events/${event.id}`}>
      <div className="row">
        <div className="col-10">
          <h5>{event.activity}</h5>
          <p>{event.description}</p>
        </div>
        <div className="col-2">{event.notificationCount > 0 && <Circle />}</div>
      </div>
    </a>
  );

export default EventTab;
