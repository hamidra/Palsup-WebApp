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
      this.handleActivitySearchSubmit = this.handleActivitySearchSubmit.bind(
        this
      );
    }

    handleActivitySearchSubmit(activity) {
      const { handleActivitySearch } = this.props;

      let date = searchDateToDateRange(activity.date);
      let searchActivity = { ...activity, date };
      if (searchActivity.activity) {
        const searchQs = qs.stringify(searchActivity);
        this.props.history.push(`search?${searchQs}`);
      }
    }
    render() {
      return (
        <div>
          <div className="background" />
          <div class="container py-3 py-md-5  z-index-20">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <ActivitySearchBox
                  initialValues={{}}
                  handleSearchSubmit={this.handleActivitySearchSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

const mapDispatchToProps = dispatch => ({
  handleActivitySearch: async activity => {
    dispatch(activityDux.actions.activityChanged(activity));
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
