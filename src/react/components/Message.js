import React, { Fragment } from 'react';
import MessageContent from './MessageContent';
import Thumbnail from './Thumbnail';

const Message = ({ message }) => (
  <div>
    <Thumbnail src={message.from.picture.thumbnail} />
    {message.content.map(content => (
      <Fragment>
        <br />
        <MessageContent
          key={content.id}
          messagePosition={{ side: 'left', order: 'last' }}>
          {content.text}
        </MessageContent>
      </Fragment>
    ))}
  </div>
);

export default Message;
