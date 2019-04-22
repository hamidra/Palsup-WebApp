import React from 'react';

const Thumbnail = ({ user, ...props }) =>
  user && (
    <div {...props}>
      {user && user.absolutePicture && user.absolutePicture.thumbnail && (
        <img
          className="avatar avatar-border-white d-inline-block rounded-circle"
          src={user.absolutePicture.thumbnail}
        />
      )}
    </div>
  );

export default Thumbnail;
