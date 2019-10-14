import React, { Component } from 'react';

export default class sendGlider extends Component {
  render() {
    return (
      <svg
        {...this.props}
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img">
        <title>Paper Plane</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          fill="white"
          stroke="#202020"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M26 38v21l10.3-14.6"
          stroke-linejoin="round"
          stroke-linecap="round"></path>
        <path
          data-name="layer1"
          fill="white"
          stroke="#202020"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M3 29L59 5l-9 48-24-15-23-9zM59 5L26 38"
          stroke-linejoin="round"
          stroke-linecap="round"></path>
      </svg>
    );
  }
}
