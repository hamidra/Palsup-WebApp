import React from 'react';
import PalCard from './cards/PalCard';
import PalModal from './modals/PalModal';

const PalsPanel = ({ pals, handleLikeClick }) => (
  <div className="row justify-content-center">
    {Object.keys(pals).map(palId => {
      if (palId) {
        const modalId = `PalModal_${palId}`;
        return (
          <div>
            <PalCard
              pal={pals[palId]}
              modalId={modalId}
              handleLikeClick={handleLikeClick}
              key={pals[palId].id}
            />
            <PalModal modalId={modalId} pal={pals[palId]} />
          </div>
        );
      }
    })}
  </div>
);

export default PalsPanel;
