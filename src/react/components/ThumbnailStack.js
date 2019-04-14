import React from 'react';
import Thumbnail from './Thumbnail';

const ThumbnailStack = ({ users }) => {
  return (
    <div className="row">
      <div className="col-12 w-100">
        {users &&
          users.map((user, index) => (
            <Thumbnail
              key={index}
              user={user}
              className="d-inline-block ml-n2"
            />
          ))}
      </div>
    </div>
  );
};

export default ThumbnailStack;
