import React from 'react';
import Work from './icons/work';
import Education from './icons/education';
import { toCapCase } from '../../utilities';
import moment from 'moment';

const UserInfoLong = ({ user, ...rest }) => (
  <div {...rest}>
    <div>
      <span style={{ fontSize: '26px', fontWeight: '800' }}>
        {`${toCapCase(user.name.first)}`}
      </span>
      ,
      <span style={{ fontSize: '26px' }}>
        {user.dob && ` ${moment().diff(moment(Number(user.dob)), 'years')}`}
      </span>
    </div>
    <div>
      {user.location &&
        `${toCapCase(user.location.city)}, ${user.location.state}`}
    </div>
    {user.work && user.work[0] && (
      <div className="row mt-1 no-gutters">
        <div className="col-1">
          <Work className="small-icon " />
        </div>
        <div className="col-11">
          {`${user.work[0].title} at ${user.work[0].organization}`}
        </div>
      </div>
    )}
    {user.education && user.education[0] && (
      <div className="row mt-1 no-gutters">
        <div className="col-1">
          <Education className="small-icon " />
        </div>
        <div className="col-11">
          {`${user.education[0].school} class of ${user.education[0].class}`}
        </div>
      </div>
    )}
    {user.bio && <p className="mt-2 pt-1 m-md-4 border-top">{user.bio}</p>}
  </div>
);

export default UserInfoLong;
