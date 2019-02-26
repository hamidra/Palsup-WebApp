import React from 'react';
import MessageThread from '../containers/MessageThreadContainer';
import MessageList from '../containers/MessageListContainer';
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

const events = {
  '5c70d51dbbb4ac37652d475a': {
    activity: 'Coffee',
    date: {
      startDate: '2019-02-19',
      endDate: '2019-02-29'
    },
    description: 'Coffe on the hills',
    group: {},
    id: '5c70d51dbbb4ac37652d475a',
    image: 'https://via.placeholder.com/150/0000FF/'
  },
  '5c70d51dbbb4ac37652d4789': {
    activity: 'Coffee on the hill',
    date: {
      startDate: '2019-02-19',
      endDate: '2019-02-29'
    },
    description: 'Coffee on the hills',
    group: {},
    id: '5c70d51dbbb4ac37652d4789',
    image: 'https://via.placeholder.com/150/0000FF/'
  }
};

export default () => (
  <div>
    {/*<MessageThread messageThread={messageThread} />*/}
    <MessageList events={events} />
  </div>
);
