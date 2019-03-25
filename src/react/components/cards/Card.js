import React from 'react';

const Card = ({ children, ...rest }) => (
  <div {...rest} className="card-container col-3 p-2">
    <div className="card shadow">{children}</div>
  </div>
);

export default Card;
