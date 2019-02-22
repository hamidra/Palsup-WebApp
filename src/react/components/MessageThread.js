import React from 'react';
import Message from './Message';

const MessageThread = ({ messageThread }) => (
  <div>
    {messageThread.map(message => (
      <Message message={message} key={message.id} />
    ))}
  </div>
);

export default MessageThread;
