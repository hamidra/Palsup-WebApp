import React from 'react';

const Card = ({ children, modalId }) => (
  <div
    className="card-container col-3 p-2"
    data-toggle="modal"
    data-target={`#${modalId}`}>
    <div className="card shadow">{children}</div>
  </div>
);

export default Card;
