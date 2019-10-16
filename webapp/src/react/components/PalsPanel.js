import React from 'react';
import PalModal from './modals/PalModal';
import { toCapCase } from '../../utilities';

const PalsPanel = ({ pals, topPals, activityFilter, handleLikeClick }) => {
  let palsCount = Object.keys(pals).length;
  let topPalsCount = Object.keys(topPals).length;
  if (palsCount > 0) {
    return (
      <div className="row justify-content-center">
        {Object.keys(pals).map(
          palId =>
            palId &&
            pals[palId] &&
            pals[palId].user && (
              <PalModal
                key={pals[palId].id}
                pal={pals[palId]}
                handleLikeClick={handleLikeClick}
              />
            )
        )}
      </div>
    );
  } else if (topPalsCount > 0) {
    return (
      <div className="row justify-content-center">
        <div className="col-12 jumbotron text-center">
          We could not find any pals in your area to join you{' '}
          {activityFilter && activityFilter.activity ? (
            <span>
              for <strong>{toCapCase(activityFilter.activity)}</strong>
            </span>
          ) : (
            <span>based on your search</span>
          )}{' '}
          but these are some top Pals in your area that you might find
          interesting!
        </div>
        {Object.keys(topPals).map(
          palId =>
            palId &&
            topPals[palId] &&
            topPals[palId].user && (
              <PalModal
                key={topPals[palId].id}
                pal={topPals[palId]}
                handleLikeClick={handleLikeClick}
              />
            )
        )}
      </div>
    );
  } else {
    return (
      <div className="row justify-content-center">
        <div className="col-12 jumbotron text-center">
          We could not find any interesting pals to join you, but be paitient
          and we will notify you as soon as anyone starts looking for exciting
          activities in your area
        </div>
      </div>
    );
  }
};
export default PalsPanel;
