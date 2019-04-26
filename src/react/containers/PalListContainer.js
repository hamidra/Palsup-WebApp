import React from 'react';
import { connect } from 'react-redux';
import PalTab from '../components/PalTab';

const PalList = ({ pals, handlePalClick }) => (
  <div className="sticky-container-top list-group list-group-flush">
    {Object.keys(pals).map(
      palId =>
        palId && (
          <div>
            <PalTab
              pal={pals[palId]}
              key={pals[palId].id}
              handlePalClick={handlePalClick}
            />
          </div>
        )
    )}
  </div>
);

const mapStateToProps = state => ({
  pals: state.userPals && state.userPals.items ? state.userPals.items : {}
});

export default connect(mapStateToProps)(PalList);
