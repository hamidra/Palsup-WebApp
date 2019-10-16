import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListContainer from '../containers/EventListContainer';
import * as dux from '../../redux/dux/index';

const Events = class extends Component {
  constructor(props) {
    super(props);
    this.handleEventClick = this.handleEventClick.bind(this);
  }
  componentDidMount() {
    this.props.handleComponentDidMount();
  }
  handleEventClick(eventId) {
    this.props.markNotificationsAsSeen(eventId);
    this.props.history.push(`/events/${eventId}`);
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 h-100 shadow-sm">
          <EventListContainer handleEventClick={this.handleEventClick} />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleComponentDidMount: () => {
    dispatch(dux.asyncActions.fetchUserEventsNotificationsOnTop());
  },
  markNotificationsAsSeen: eventId => {
    dispatch(dux.asyncActions.markEventNotificationsAsSeen(eventId));
  }
});

export default connect(null, mapDispatchToProps)(Events);
