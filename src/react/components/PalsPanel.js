import React from 'react';
import PalCard from './cards/PalCard';

const PalsPanel = ({ pals, handleLikeClick }) => (
  <div className="row justify-content-center">
    {Object.keys(pals).map(palId => {
      if (palId)
        return (
          <PalCard
            pal={pals[palId]}
            handleLikeClick={handleLikeClick}
            key={pals[palId].id}
          />
        );
    })}
  </div>
);

export default PalsPanel;
