import React from 'react';
import moment from 'moment';
import Card from './Card';

const EventCard = ({ event }) => (
  <Card>
    <img src={event.image} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{event.activity}</h5>
      <h6 className="card-subtitle">
        {moment(event.date.startDate).fromNow() || 'anytime!'}
      </h6>
    </div>
    <div className="card-footer">footer</div>
  </Card>
);

export default EventCard;
