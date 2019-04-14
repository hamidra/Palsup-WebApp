import React from 'react';
import Card from './Card';
import HeartIcon from '../icons/heart';
import { displayDateFromNow, getTopN } from '../../../utilities';
import ThumbnailStack from '../ThumbnailStack';

const EventCard = ({ event, handleShowModal, handleLikeClick }) => {
  return (
    <Card onClick={handleShowModal}>
      <img src={event.absoluteImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{event.activity}</h5>
        <h6 className="card-subtitle">{displayDateFromNow(event.date)}</h6>
      </div>
      <div className="card-footer d-flex">
        <ThumbnailStack
          users={
            event &&
            event.group &&
            event.group.members &&
            getTopN(event.group.members, 4)
          }
        />
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
  );
};

export default EventCard;
