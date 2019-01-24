import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SearchBarContainer from '../containers/SearchBarContainer';
import ResultPanelContainer from '../containers/ResultPanelContainer';

class SearchActivity extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <SearchBarContainer />
        <ResultPanelContainer />
      </div>
    );
  }
}

export default SearchActivity;
