import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import HeartIcon from './icons/heart';
import ThumbsUp from './icons/Thumbsup';
import ThumbsDown from './icons/ThumbsDown';

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
    let { user, handleRecruit } = this.props;
    return (
      user && (
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-5">
                <img
                  className="avatar avatar-lg"
                  src={user.absolutePicture && user.absolutePicture.medium}
                />
              </div>
              <div className="col-7">
                <div className="w-100">
                  {user.name && `${user.name.first}`}
                  <br />
                  {user.dob &&
                    `${moment().diff(moment(Number(user.dob)), 'years')}, `}
                  {user.gender && user.gender !== 'UNKNOWN' && user.gender}
                  <br />
                  {user.location &&
                    `${user.location.city}, ${user.location.state}`}
                </div>
                {handleRecruit && (
                  <div className="row border-top mt-1 pt-3 w-100">
                    <a className="col">
                      <ThumbsDown className="action-icon thumbs-icon" />
                      <span>No</span>
                    </a>
                    <a className="col">
                      <ThumbsUp className="action-icon thumbs-icon" />
                      <span>Yes</span>
                    </a>
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
