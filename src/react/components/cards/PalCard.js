import React from 'react';
import Card from './Card';
import HeartIcon from '../icons/heart';
import { displayDateFromNow } from '../../../utilities';

const PalCard = ({ pal, handleLikeClick, handleModalShow }) =>
  pal &&
  pal.user && (
    <Card>
      <img
        src={pal.user.absolutePicture && pal.user.absolutePicture.large}
        onClick={handleModalShow}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" onClick={handleModalShow}>
        <p className="card-title">
          {`${pal.user.name && pal.user.name.first}'s down for`}
          <br />
          <h5>{pal.activity}</h5>
        </p>
        <h6 className="card-subtitle">{displayDateFromNow(pal.date)}</h6>
      </div>
      <div className="card-footer d-flex">
        <button
          className="ml-auto  icon"
          onClick={event => {
            handleLikeClick(pal.id, !pal.liked);
            event.stopPropagation();
          }}>
          <HeartIcon
            className="action-icon heart-icon"
            fill={pal.liked ? 'blue' : 'white'}
          />
        </button>
      </div>
    </Card>
  );

export default PalCard;
