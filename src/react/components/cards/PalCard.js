import React from 'react';
import moment from 'moment';
import Card from './Card';
import HeartIcon from '../icons/heart';
import CloseIcon from '../icons/close';
import { displayDateFromNow } from '../../../utilities';

const PalCard = ({ pal, handleLikeClick, handleModalShow }) =>
  pal && (
    <Card>
      <img
        src={pal.user.absolutePicture.large}
        onClick={handleModalShow}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" onClick={handleModalShow}>
        <p className="card-title">
          {`${pal.user.name.first}'s down for`} <br /> <h5>{pal.activity}</h5>
        </p>
        <h6 className="card-subtitle">{displayDateFromNow(pal.date)}</h6>
      </div>
      <div className="card-footer d-flex">
        <a
          class="bg-white action-icon ml-auto"
          onClick={event => {
            handleLikeClick(pal.id, !pal.liked);
            event.stopPropagation();
          }}>
          <HeartIcon fill={pal.liked ? 'blue' : 'white'} />
        </a>
      </div>
    </Card>
  );

export default PalCard;
