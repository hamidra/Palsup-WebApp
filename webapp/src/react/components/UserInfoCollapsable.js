import React, { Component, Fragment } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import ThumbsUp from './icons/Thumbsup';
import ThumbsDown from './icons/ThumbsDown';
import { toCapCase } from '../../utilities';
import AngleUpCircle from './icons/angleUpCircle';
import AngleDownCircle from './icons/angleDownCircle';
import UserInfoLong from './UserInfoLong';

const UserInfoCollapsed = ({ user, handleVoteOnWaitlist, toggleCollapse }) => {
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-5">
            <img
              className="avatar avatar-lg"
              src={user.absolutePicture && user.absolutePicture.medium}
              alt="..."
            />
          </div>
          <div className="col-5">
            <div className="w-100">
              {`${toCapCase(user.name.first)}`}
              <br />
              {user.dob &&
                `${moment().diff(moment(Number(user.dob)), 'years')}, `}
              {user.gender && user.gender !== 'UNKNOWN' && user.gender}
              <br />
              {user.location && `${user.location.city}, ${user.location.state}`}
            </div>
            {handleVoteOnWaitlist && (
              <div className="row border-top mt-1 pt-3 w-100">
                <button
                  className="col icon"
                  onClick={e => {
                    e.preventDefault();
                    handleVoteOnWaitlist(user.id, false);
                  }}>
                  <ThumbsDown className="action-icon medium-icon" />
                  <span>No</span>
                </button>
                <button
                  className="col icon"
                  onClick={e => {
                    e.preventDefault();
                    handleVoteOnWaitlist(user.id, true);
                  }}>
                  <ThumbsUp className="action-icon medium-icon" />
                  <span>Yes</span>
                </button>
              </div>
            )}
          </div>
          <button
            className="icon tab-expand"
            onClick={e => {
              e.preventDefault();
              toggleCollapse();
            }}>
            <AngleDownCircle className="action-icon medium-icon" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

const UserInfoExpanded = ({ user, handleVoteOnWaitlist, toggleCollapse }) => {
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-12" align="center">
            <img
              className="w-100"
              src={user.absolutePicture && user.absolutePicture.large}
              alt="..."
            />
          </div>
          <UserInfoLong className="w-100" user={user} />
          <div className="col-12 mt-3">
            {handleVoteOnWaitlist && (
              <div className="row border-top mt-1 pt-3 w-100">
                <button
                  className="col icon"
                  onClick={e => {
                    e.preventDefault();
                    handleVoteOnWaitlist(user.id, false);
                  }}>
                  <ThumbsDown className="action-icon medium-icon" />
                  <span>No</span>
                </button>
                <button
                  className="col icon"
                  onClick={e => {
                    e.preventDefault();
                    handleVoteOnWaitlist(user.id, true);
                  }}>
                  <ThumbsUp className="action-icon medium-icon" />
                  <span>Yes</span>
                </button>
              </div>
            )}
          </div>
          <button
            className="icon tab-collapse"
            onClick={e => {
              e.preventDefault();
              toggleCollapse();
            }}>
            <AngleUpCircle className="action-icon medium-icon" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default class UserInfoCollapsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  toggleCollapse() {
    this.setState(state => ({ collapsed: !state.collapsed }));
  }
  render() {
    if (this.props.user) {
      if (this.state.collapsed)
        return (
          <UserInfoCollapsed
            {...this.props}
            toggleCollapse={this.toggleCollapse}
          />
        );
      else
        return (
          <UserInfoExpanded
            {...this.props}
            toggleCollapse={this.toggleCollapse}
          />
        );
    }
  }
}
