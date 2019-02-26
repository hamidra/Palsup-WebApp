import React from 'react';
import { connect } from 'react-redux';
import MessageTab from '../components/MessageTab';

const MessageList = ({ events }) => (
  <div className="list-group list-group-flush">
    {Object.keys(events).map(eventId => {
      if (eventId) {
        return (
          <div>
            <MessageTab event={events[eventId]} key={events[eventId].id} />
          </div>
        );
      }
    })}
  </div>
);

const mapStateToProps = state => ({
  events:
    state.userEvents && state.userEvents.items ? state.userEvents.items : {}
});

export default connect(mapStateToProps)(MessageList);
