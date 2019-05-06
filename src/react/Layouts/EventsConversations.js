import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListContainer from '../containers/EventListContainer';
import MessageThreadContainer from '../containers/MessageThreadContainer';
import * as dux from '../../redux/dux/index';
import MessageBoxContainer from '../containers/MessageBoxContainer';
import EventInfoContainer from '../containers/EventInfoContainer';
import { Link } from 'react-router-dom';

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
    const eid = this.props.match.params.id;
    return (
      <div className="row">
        <div className="col-lg-4 d-none d-lg-block h-100 shadow-sm">
          <EventListContainer
            activeEventId={eid}
            handleEventClick={this.handleEventClick}
          />
        </div>
        <div className="col-12 d-block d-lg-none h-100">
          <Link to="/events">{'<Back'}</Link>
        </div>
        <div className="col-12 col-lg-8">
          <div className="mt-1">
            <EventInfoContainer eventId={eid} />
            <MessageThreadContainer eventId={eid} />
            <div className="sticky-container-bottom pb-2 bg-white">
              <MessageBoxContainer eventId={eid} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleComponentDidMount: () => {
    dispatch(dux.asyncActions.fetchUserEvents(true));
  },
  markNotificationsAsSeen: eventId => {
    dispatch(
      dux.asyncActions.markNotificationAsSeen({ id: eventId, type: 'EVENT' })
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Events);
