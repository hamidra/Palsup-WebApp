import React from 'react';
const getBorderStyle = position => {
  var style = '';
  if (position.side === 'right') {
    style += 'rounded-left ';
  } else if (position.side === 'left') {
    style += 'rounded-right ';
  }
  if (position.order === 'first') {
    style += 'rounded-top ';
  } else if (position.order === 'last') {
    style += 'rounded-bottom ';
  }
  return style;
};
const MessageContent = ({ children, messagePosition }) => (
  <div
    className={`d-inline-block 
    shadow-sm 
    bg-secondary text-white 
    m-2 p-3 
    ${getBorderStyle(messagePosition)}`}>
    {children}
  </div>
);

export default MessageContent;
