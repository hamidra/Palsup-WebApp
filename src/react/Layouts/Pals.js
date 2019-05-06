import React, { Component } from 'react';
import { connect } from 'react-redux';
import PalListContainer from '../containers/PalListContainer';
import qs from 'qs';
import * as dux from '../../redux/dux/index';

const Pals = class extends Component {
  constructor(props) {
    super(props);
    this.handlePalClick = this.handlePalClick.bind(this);
  }
  componentDidMount() {
    this.props.handleComponentDidMount();
  }
  handlePalClick(palId, searchActivity) {
    this.props.markNotificationsAsSeen(palId);
    if (searchActivity.activity) {
      const searchQs = qs.stringify(searchActivity);
      this.props.history.push(`search?${searchQs}`);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 h-100 shadow-sm">
          <PalListContainer handlePalClick={this.handlePalClick} />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleComponentDidMount: () => {
    dispatch(dux.asyncActions.fetchUserPals());
  },
  markNotificationsAsSeen: palId => {
    dispatch(
      dux.asyncActions.markNotificationAsSeen({ id: palId, type: 'PAL' })
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Pals);
