import React from 'react';

const Close = ({ ...rest }) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img">
    <title>Close</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer1"
      fill="none"
      stroke="#202020"
      stroke-miterlimit="10"
      stroke-width="2"
      d="M41.999 20.002l-22 22m22 0L20 20"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
);

export default Close;
