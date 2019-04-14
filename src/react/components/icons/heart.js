import React from 'react';

const heart = ({ fill, ...rest }) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      id="heart-1">
      <title>Heart</title>
      <desc>A line styled icon from Orion Icon Library.</desc>
      <path
        data-name="layer1"
        d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"
        fill={fill}
        stroke="#101010"
        stroke-miterlimit="10"
        stroke-linejoin="round"
        stroke-linecap="round"
        style={{ stroke: 'var(--layer1, #101010)' }}
      />
    </svg>
  );
};

export default heart;
