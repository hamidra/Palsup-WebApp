import React from 'react';
import Circle from '../components/icons/circle';

const PalTab = ({ pal, handlePalClick }) =>
  pal && (
    <button
      className="list-group-item list-group-item-action border-top"
      onClick={e => {
        if (pal) {
          var searchActivity = {
            activity: pal.activity,
            location: pal.location,
            date: pal.date && { from: pal.date.startDate, to: pal.date.endDate }
          };
          handlePalClick(pal.id, searchActivity);
        }
        e.preventDefault();
      }}>
      <div className="row">
        <div className="col-10">
          <h5>{pal.activity}</h5>
        </div>
        <div className="col-2 align-start">
          {pal.notification &&
          pal.notification.totalCount &&
          pal.notification.totalCount > 0 ? (
            <Circle className="notification-circle" />
          ) : null}
        </div>
      </div>
    </button>
  );

export default PalTab;
