import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageListContainer from '../containers/MessageListContainer';
import MessageThreadContainer from '../containers/MessageThreadContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as dux from '../../redux/dux/index';
import MessageBoxContainer from '../containers/MessageBoxContainer';

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
                  <div className="sticky-container-bottom pb-2 bg-white">
                    <MessageBoxContainer eventId={match.params.id} />
                  </div>
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
    dispatch(dux.asyncActions.fetchUserEvents());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Messages);
