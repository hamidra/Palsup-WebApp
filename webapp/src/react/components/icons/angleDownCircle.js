import React from 'react';

const angleUpCircle = ({ ...rest }) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img">
    <title>Angle Down Circle</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer2"
      fill="none"
      stroke="#202020"
      stroke-miterlimit="10"
      stroke-width="2"
      d="M21.001 28l10.994 13 11.006-13"
      stroke-linejoin="round"
      stroke-linecap="round"></path>
    <circle
      data-name="layer1"
      cx="32"
      cy="32"
      r="30"
      fill="none"
      stroke="#202020"
      stroke-miterlimit="10"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
);

export default angleUpCircle;
