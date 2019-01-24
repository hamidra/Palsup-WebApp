import React from 'react';
import moment from 'moment';
import Card from './Card';

const PalCard = ({ pal }) => (
  <Card>
    <img src={pal.image} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{pal.activity.type}</h5>
      <h6 className="card-subtitle">
        {moment(pal.date.startDate).fromNow() || 'anytime!'}
      </h6>
    </div>
    <div className="card-footer">footer</div>
  </Card>
);

export default PalCard;
