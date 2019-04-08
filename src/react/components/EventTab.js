import React from 'react';

const EventTab = ({ event }) => (
  <a
    className="list-group-item list-group-item-action border-top"
    href={`/events/${event.id}`}>
    <h5>{event.activity}</h5>
    <p>{event.description}</p>
  </a>
);

export default EventTab;
