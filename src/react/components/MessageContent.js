import React from 'react';
const getBorderStyle = (direction, order) => {
  var style = '';
  if (direction === 'rtl') {
    style += 'rounded-left ';
  } else if (direction === 'ltr') {
    style += 'rounded-right ';
  }
  if (order === 'first') {
    style += 'rounded-top ';
  } else if (order === 'last') {
    style += 'rounded-bottom ';
  }
  return style;
};
const MessageContent = ({ children, direction, order }) => (
  <div
    className={`d-inline-block 
    shadow-sm 
    ${direction === 'rtl' ? 'bg-primary' : 'bg-secondary'}
    text-white 
    mx-2 p-3 
    ${getBorderStyle(direction, order)}`}>
    {children}
  </div>
);

export default MessageContent;
