import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

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
    let { user } = this.props;
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
                {user.name && `${user.name.first} ${user.name.last}`}
                <br />
                {user.dob &&
                  `${moment().diff(moment(Number(user.dob)), 'years')}, `}
                {user.gender && user.gender !== 'UNKNOWN' && user.gender}
                <br />
                {user.location &&
                  `${user.location.city}, ${user.location.state}`}
              </div>
            </div>
          </Card.Body>
        </Card>
      )
    );
  }
}
