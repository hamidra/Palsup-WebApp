import React from 'react';
const ThumbsDown = ({ ...rest }) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img">
    <title>Unlike</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer1"
      d="M10 29H8a4 4 0 0 0 0 8h22a81 81 0 0 0-2 18 4 4 0 0 0 8 0s4-22 18-22h6V9H50c-4 0-12-4-16-4H14a4 4 0 0 0 0 8h-2a4 4 0 0 0 0 8h-2a4 4 0 0 0 0 8"
      fill="none"
      stroke="#202020"
      stroke-miterlimit="10"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
);

export default ThumbsDown;
