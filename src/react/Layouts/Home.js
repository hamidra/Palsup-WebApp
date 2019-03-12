import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivitySearchBox from '../containers/ActivitySearchBox';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';

const Home = withRouter(
  class extends Component {
    handleActivitySearchSubmit(activity) {
      let qs = '';
      if (activity.name) {
        qs += `activity=${activity.name}`;
        this.props.history.push(`search?${qs}`);
      }
    }
    render() {
      return (
        <div>
          <div className="background" />
          <div class="container py-6 py-md-7 text-white z-index-20">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <ActivitySearchBox
                  handleActivitySearchSubmit={this.handleActivitySearchSubmit.bind(
                    this
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default Home;
