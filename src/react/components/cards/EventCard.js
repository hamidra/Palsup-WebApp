import React from 'react';
import Card from './Card';
import { displayDateFromNow } from '../../../utilities';

const EventCard = ({ event, modalId, handleLikeClick }) => (
  <Card modalId={modalId}>
    <img
      src={event.image}
      className="card-img-top"
      data-toggle="modal"
      data-target={`#${modalId}`}
      alt="..."
    />
    <div className="card-body" data-toggle="modal" data-target={`#${modalId}`}>
      <h5 className="card-title">{event.activity}</h5>
      <h6 className="card-subtitle">{displayDateFromNow(event.date)}</h6>
    </div>
    <div className="card-footer d-flex">
      <button type="button" class="btn mr-auto">
        attendees
      </button>
      <button type="button" class="btn ml-auto">
        Like
      </button>
    </div>
  </Card>
);

export default EventCard;
