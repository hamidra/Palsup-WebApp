import React from 'react';
import PalCard from './cards/PalCard';

const PalsPanel = ({ pals }) => (
  <div className="row justify-content-center">
    {pals.map((pal, index) => (
      <PalCard pal={pal} key={pal.id || index} />
    ))}
  </div>
);

export default PalsPanel;
