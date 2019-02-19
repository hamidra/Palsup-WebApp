import React from 'react';
import moment from 'moment';
import Card from './Card';
import { displayDateFromNow } from '../../../utilities';

const PalCard = ({ pal, modalId, handleLikeClick }) => (
  <Card modalId={modalId}>
    <img
      src={pal.user.picture.large}
      className="card-img-top"
      data-toggle="modal"
      data-target={`#${modalId}`}
      alt="..."
    />
    <div className="card-body" data-toggle="modal" data-target={`#${modalId}`}>
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
        onClick={() => {
          handleLikeClick(pal.id, !pal.liked);
        }}>
        Like
      </button>
    </div>
  </Card>
);

export default PalCard;
