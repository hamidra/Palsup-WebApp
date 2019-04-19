import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListContainer from '../containers/EventListContainer';
import MessageThreadContainer from '../containers/MessageThreadContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as dux from '../../redux/dux/index';
import MessageBoxContainer from '../containers/MessageBoxContainer';
import EventInfoContainer from '../containers/EventInfoContainer';
import { Link } from 'react-router-dom';

const Events = class extends Component {
  componentDidMount() {
    this.props.handleComponentDidMount();
  }
  render() {
    const eid = this.props.match.params.id;
    return (
      <div className="row">
        <div className="col-lg-4 d-none d-lg-block h-100 shadow-sm">
          <EventListContainer />
        </div>
        <div className="col-lg-4 d-block d-lg-none h-100 shadow-sm">
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
    dispatch(dux.asyncActions.fetchUserEvents());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Events);
