import React from 'react';

const Card = ({ children }) => (
  <div className="card-container col-3 p-2">
    <div className="card shadow">{children}</div>
  </div>
);

export default Card;
