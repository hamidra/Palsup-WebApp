import React from 'react';
import moment from 'moment';
import Card from './Card';
import { displayDateFromNow } from '../../../utilities';

const PalCard = ({ pal, handleShowModal, handleLikeClick }) => (
  <Card onClick={handleShowModal}>
    <img src={pal.user.picture.large} className="card-img-top" alt="..." />
    <div className="card-body">
      <p className="card-title">
        {`${pal.user.name.first}'s down for`} <br /> <h5>{pal.activity}</h5>
      </p>
      <h6 className="card-subtitle">{displayDateFromNow(pal.date)}</h6>
    </div>
    <div className="card-footer d-flex">
      <button
        type="button"
        class="btn ml-auto"
        style={{ backgroundColor: pal.liked && 'blue' }}
        onClick={event => {
          handleLikeClick(pal.id, !pal.liked);
          event.stopPropagation();
        }}>
        Like
      </button>
    </div>
  </Card>
);

export default PalCard;
