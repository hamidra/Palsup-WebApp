import React from 'react';
import { connect } from 'react-redux';
import ResultPanelContainer from '../containers/ResultPanelContainer';
import * as activityDux from '../../redux/dux/activity';
import * as dux from '../../redux/dux/index';
import ActivitySearchBar from '../containers/ActivitySearchBar';
import { convertSearchDateToDateRange } from '../../utilities';
import qs from 'qs';

const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.handleActivitySearchSubmit = this.handleActivitySearchSubmit.bind(
      this
    );
  }
  componentDidMount() {
    const { handleActivitySearch, location } = this.props;
    const query = qs.parse(location.search.slice(1));
    let activity = {
      activity: query && query.activity,
      location: query && query.location,
      date: query && query.date
    };
    handleActivitySearch(activity);
  }
  handleActivitySearchSubmit(activity) {
    const { handleActivitySearch } = this.props;
    if (activity.activity) {
      const searchQs = qs.stringify(activity);
      this.props.history.push(`search?${searchQs}`);
      handleActivitySearch(activity);
    }
  }
  render() {
    const { activity, location } = this.props;
    return (
      <div className="container-fluid">
        <ActivitySearchBar
          key={location.search}
          initialValues={activity}
          handleSearchSubmit={this.handleActivitySearchSubmit}
        />
        <ResultPanelContainer />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search.slice(1));
  let activity = {
    activity: query && query.activity,
    location: query && query.location,
    date: query && query.date
  };
  return { activity };
};

const mapDispatchToProps = dispatch => ({
  handleActivitySearch: async searchActivity => {
    let date = convertSearchDateToDateRange(searchActivity.date);
    let activity = { ...searchActivity, date };
    dispatch(activityDux.actions.activityChanged(activity));
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
