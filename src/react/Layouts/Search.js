import React from 'react';
import { connect } from 'react-redux';
import ResultPanelContainer from '../containers/ResultPanelContainer';
import * as activityDux from '../../redux/dux/activity';
import * as dux from '../../redux/dux/index';
import ActivitySearchBar from '../containers/ActivitySearchBar';
import qs from 'qs';

const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.handleActivitySearchForDate = this.handleActivitySearchForDate.bind(
      this
    );
  }
  componentDidMount() {
    const {
      handleActivitySearchValueChange,
      handleActivitySearch,
      location
    } = this.props;
    const query = qs.parse(location.search.slice(1));
    let activity = {
      activity: query && query.activity,
      location: query && query.location,
      date: query && query.date
    };
    handleActivitySearchValueChange(activity);
    handleActivitySearch();
  }
  handleActivitySearchForDate() {
    const {
      handleActivitySearchValueChange,
      handleActivitySearch,
      activity
    } = this.props;
    if (activity.activity) {
      handleActivitySearchValueChange(activity);
      const searchQs = qs.stringify(activity);
      this.props.history.push(`search?${searchQs}`);
      handleActivitySearch();
    }
  }
  render() {
    const { activity, handleActivitySearchValueChange } = this.props;
    return (
      <div className="container-fluid">
        <ActivitySearchBar
          searchValues={activity}
          handleSearchValueChange={handleActivitySearchValueChange}
          handleActivitySearchForDate={this.handleActivitySearchForDate}
        />
        <ResultPanelContainer />
      </div>
    );
  }
};

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
)(Search);
