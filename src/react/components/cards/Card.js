import React from 'react';

const Card = ({ children, ...rest }) => (
  <div className="card shadow">{children}</div>
);

export default Card;
