import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ActivitySearchBox from '../containers/ActivitySearchBox';
import * as activityDux from '../../redux/dux/activity';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import communityBanner from '../../images/communityBanner.svg';
import qs from 'qs';

const Home = withRouter(
  class extends Component {
    constructor(props) {
      super(props);
      this.handleActivitySearchSubmit = this.handleActivitySearchSubmit.bind(
        this
      );
    }

    handleActivitySearchSubmit(searchActivity) {
      if (searchActivity.activity) {
        const searchQs = qs.stringify(searchActivity);
        this.props.history.push(`/search?${searchQs}`);
      }
    }
    render() {
      return (
        <div>
          <div className="background" />
          <div className="container z-index-20">
            <div className="row justify-content-center">
              <div className="col-12  d-flex justify-content-center">
                <img src={communityBanner} className="home-banner" />
              </div>
              <div className="col-md-10">
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
