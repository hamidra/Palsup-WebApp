import React from 'react';
import PalModal from './modals/PalModal';

const PalsPanel = ({ pals, handleLikeClick }) =>
  pals && (
    <div className="row justify-content-center">
      {Object.keys(pals).map(
        palId =>
          palId &&
          pals[palId] && (
            <PalModal
              key={pals[palId].id}
              pal={pals[palId]}
              handleLikeClick={handleLikeClick}
            />
          )
      )}
    </div>
  );

export default PalsPanel;
