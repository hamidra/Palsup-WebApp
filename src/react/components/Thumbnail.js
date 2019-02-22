import React from 'react';

const Thumbnail = ({ ...prop }) => (
  <img class="thumbnail d-inline-block rounded-circle" {...prop} />
);

export default Thumbnail;
