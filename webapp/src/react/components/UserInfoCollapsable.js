import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import ThumbsUp from './icons/Thumbsup';
import ThumbsDown from './icons/ThumbsDown';
import { toCapCase } from '../../utilities';

export default class UserInfoCollapsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {
    let { user, handleVoteOnWaitlist } = this.props;
    return (
      user && (
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
              <div className="col-7">
                <div className="w-100">
                  {`${toCapCase(user.name.first)}`}
                  <br />
                  {user.dob &&
                    `${moment().diff(moment(Number(user.dob)), 'years')}, `}
                  {user.gender && user.gender !== 'UNKNOWN' && user.gender}
                  <br />
                  {user.location &&
                    `${user.location.city}, ${user.location.state}`}
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
            </div>
          </Card.Body>
        </Card>
      )
    );
  }
}
