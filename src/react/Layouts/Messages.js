import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageListContainer from '../containers/MessageListContainer';
import MessageThreadContainer from '../containers/MessageThreadContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as userEventDux from '../../redux/dux/userEvents';
import MessageBoxContainer from '../containers/MessageBoxContainer';

/*const messages = [
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
};*/

const Messages = class extends Component {
  componentDidMount() {
    this.props.handleComponentDidMount();
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 d-none d-lg-block h-100 shadow-sm">
          <MessageListContainer />
        </div>
        <div className="col-12 col-lg-8">
          <Route
            exact
            path="/messages/event/:id"
            render={({ match }) => {
              const eid = match.params.id;
              return (
                <div>
                  <MessageThreadContainer eventId={eid} />
                  <MessageBoxContainer eventId={match.params.id} />
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleComponentDidMount: () => {
    dispatch(userEventDux.asyncActions.fetchEvents());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Messages);
