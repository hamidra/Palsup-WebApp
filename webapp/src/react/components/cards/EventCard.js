import React from 'react';
import Card from './Card';
import HeartIcon from '../icons/heart';
import { displayDateFromNow } from '../../../utilities';
import EventMemberContainer from '../../containers/EventMemberContainer';

const EventCard = ({ event, handleLikeClick, handleModalShow }) => {
  return (
    event && (
      <Card>
        <img
          src={event.absoluteImage}
          className="card-img-top"
          onClick={handleModalShow}
          alt="..."
        />
        <div className="card-body" onClick={handleModalShow}>
          <h5 className="card-title">{event.activity}</h5>
          <h6 className="card-subtitle">{displayDateFromNow(event.date)}</h6>
        </div>
        <div className="card-footer d-flex">
          <EventMemberContainer event={event} />
          <button
            className="icon ml-auto"
            onClick={e => {
              handleLikeClick(event.id, !event.liked);
              e.stopPropagation();
            }}>
            <HeartIcon
              className="action-icon large-icon"
              fill={event.liked ? 'blue' : 'white'}
            />
          </button>
        </div>
      </Card>
    )
  );
};

export default EventCard;
