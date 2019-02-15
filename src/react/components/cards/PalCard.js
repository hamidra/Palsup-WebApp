import React from 'react';
import moment from 'moment';
import Card from './Card';
import { displayDateFromNow } from '../../../utilities';

const PalCard = ({ pal, handleLikeClick }) => (
  <Card>
    <img src={pal.image} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{pal.activity}</h5>
      <h6 className="card-subtitle">{displayDateFromNow(pal.date)}</h6>
    </div>
    <div className="card-footer d-flex">
      <button type="button" class="btn ml-auto" onClick={handleLikeClick}>
        Like
      </button>
    </div>
  </Card>
);

export default PalCard;
