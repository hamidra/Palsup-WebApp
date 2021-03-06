import React from 'react';

const ThumbsUp = ({ ...rest }) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img">
    <title>Like</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer1"
      d="M54 35h2a4 4 0 1 0 0-8H34a81 81 0 0 0 2-18 4 4 0 0 0-8 0s-4 22-18 22H4v24h10c4 0 12 4 16 4h20a4 4 0 0 0 0-8h2a4 4 0 0 0 0-8h2a4 4 0 0 0 0-8"
      fill="none"
      stroke="#202020"
      stroke-miterlimit="10"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
);

export default ThumbsUp;
