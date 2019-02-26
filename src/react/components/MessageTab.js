import React from 'react';

const MessageTab = ({ event }) => (
  <a
    className="list-group-item list-group-item-action border-top"
    href={`/messages/event/${event.id}`}>
    <h5>{event.activity}</h5>
    <p>{event.description}</p>
  </a>
);

export default MessageTab;
