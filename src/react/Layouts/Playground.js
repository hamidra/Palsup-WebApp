import React from 'react';
import MessageThread from '../components/MessageThread';
const messageThread = [
  {
    // message
    id: '2',
    from: {
      //User
      userId: '1',
      picture: {
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/31.jpg'
      }
    },
    content: [
      {
        //content
        contentId: 1,
        timestamp: '2019-2-20T16:00:00',
        text:
          'Hey, Up for some drinks at witness on Monday afternoonnnnnnnnnnnnnnnnnnnnnnnnn',
        media: ''
      },
      {
        contentId: 2,
        timestamp: '2019-2-20T16:05:00',
        text: 'Maybe even sooner!!!',
        media: ''
      }
    ]
  },
  {
    // message
    id: '3',
    from: {
      //User
      userId: '1',
      picture: {
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/59.jpg'
      }
    },
    content: [
      {
        //content
        contentId: 1,
        timestamp: '2019-2-20T16:00:00',
        text: 'Hey, Up for some drinks at witness on Monday afternoon',
        media: ''
      },
      {
        contentId: 2,
        timestamp: '2019-2-20T16:05:00',
        text: 'Maybe even sooner!!!',
        media: ''
      }
    ]
  }
];
export default () => (
  <div>
    <MessageThread messageThread={messageThread} />
  </div>
);
