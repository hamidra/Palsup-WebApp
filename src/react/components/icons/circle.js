import React from 'react';

const Circle = ({ ...rest }) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-label=", Has Notifications"
    role="img">
    <circle cx="3" cy="3" r="3" />
  </svg>
);

export default Circle;
