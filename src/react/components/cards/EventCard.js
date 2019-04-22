import React from 'react';
import Card from './Card';
import HeartIcon from '../icons/heart';
import { displayDateFromNow, getTopN } from '../../../utilities';
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
          <a
            class="bg-white action-icon ml-auto"
            onClick={e => {
              handleLikeClick(event.id, !event.liked);
              e.stopPropagation();
            }}>
            <HeartIcon fill={event.liked ? 'blue' : 'white'} />
          </a>
        </div>
      </Card>
    )
  );
};

export default EventCard;
