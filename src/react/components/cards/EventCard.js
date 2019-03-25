import React from 'react';
import Card from './Card';
import { displayDateFromNow } from '../../../utilities';

const EventCard = ({ event, handleShowModal, handleLikeClick }) => (
  <Card onClick={handleShowModal}>
    <img src={event.image} className="card-img-top" alt="..." />
    <div className="card-body">
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
