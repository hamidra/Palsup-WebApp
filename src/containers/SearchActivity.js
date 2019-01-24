import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SearchBarContainer from '../containers/SearchBarContainer';
import ResultPanel from '../components/ResultPanel';

class SearchActivity extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <SearchBarContainer />
        <ResultPanel />
      </div>
    );
  }
}

export default SearchActivity;
