import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivitySearchBox from '../containers/ActivitySearchBox';
import * as activityDux from '../../redux/dux/activity';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import qs from 'qs';
import { searchDateToDateRange } from '../../utilities';

const Home = withRouter(
  class extends Component {
    constructor(props) {
      super(props);
      this.handleActivitySearchForDate = this.handleActivitySearchForDate.bind(
        this
      );
    }
    componentDidMount() {
      //erase activity
    }
    handleActivitySearchForDate(dateRange) {
      const {
        handleActivitySearchValueChange,
        handleActivitySearch,
        activity
      } = this.props;

      let date = searchDateToDateRange(dateRange);
      let searchActivity = { ...activity, date };
      if (searchActivity.activity) {
        const searchQs = qs.stringify(searchActivity);
        this.props.history.push(`search?${searchQs}`);
      }
    }
    render() {
      const { activity, handleActivitySearchValueChange } = this.props;
      return (
        <div>
          <div className="background" />
          <div class="container py-3 py-md-5  z-index-20">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <ActivitySearchBox
                  searchValues={activity}
                  handleSearchValueChange={handleActivitySearchValueChange}
                  handleActivitySearchForDate={this.handleActivitySearchForDate}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

const mapStateToProps = state => ({
  activity: state.activity
});

const mapDispatchToProps = dispatch => ({
  handleActivitySearchValueChange: change => {
    dispatch(activityDux.actions.activityChanged(change));
  },
  handleActivitySearch: async () => {
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
