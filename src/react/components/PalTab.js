import React from 'react';

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
          handlePalClick(searchActivity);
        }
        e.preventDefault();
      }}>
      <h5>{pal.activity}</h5>
    </button>
  );

export default PalTab;
