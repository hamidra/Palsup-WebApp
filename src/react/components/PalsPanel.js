import React from 'react';
import PalModal from './modals/PalModal';

const PalsPanel = ({ pals, handleLikeClick }) => (
  <div className="row justify-content-center">
    {Object.keys(pals).map(palId => {
      if (palId && pals[palId]) {
        return (
          <div>
            <PalModal
              key={pals[palId].id}
              pal={pals[palId]}
              handleLikeClick={handleLikeClick}
            />
          </div>
        );
      }
    })}
  </div>
);

export default PalsPanel;
