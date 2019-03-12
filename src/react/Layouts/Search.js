import React from 'react';
import SearchBarContainer from '../containers/SearchBarContainer';
import ResultPanelContainer from '../containers/ResultPanelContainer';
import ActivitySearchBox from '../containers/ActivitySearchBox';
import * as dux from '../../redux/dux/index';

const Search = (handleComponentDidMount, handleActivitySearchSubmit) => (
  <div className="container-fluid">
    <ActivitySearchBox />
    <ResultPanelContainer />
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleActivitySearchSubmit: async () => {
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  },
  handleComponentDidMount: async () => {
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  }
});

export default Search;
