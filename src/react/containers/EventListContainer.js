import React from 'react';
import { connect } from 'react-redux';
import EventTab from '../components/EventTab';

const EventList = ({ events, activeEventId }) =>
  events && (
    <div className="sticky-container-top list-group list-group-flush">
      {Object.keys(events).map(eventId => {
        if (eventId) {
          return (
            <div>
              <EventTab
                event={events[eventId]}
                key={eventId}
                active={eventId === activeEventId}
              />
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

export default connect(mapStateToProps)(EventList);