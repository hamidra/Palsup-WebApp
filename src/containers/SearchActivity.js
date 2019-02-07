import React, { Component } from 'react';
import SearchBarContainer from '../containers/SearchBarContainer';
import ResultPanelContainer from '../containers/ResultPanelContainer';

class SearchActivity extends Component {
  render() {
    return (
      <div className="container">
        <SearchBarContainer />
        <ResultPanelContainer />
      </div>
    );
  }
}

export default SearchActivity;
