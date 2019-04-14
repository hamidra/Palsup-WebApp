import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventPicEditorContainer from './EventPicEditorContainer';
import ThumbnailStack from '../components/ThumbnailStack';
import { getTopN, displayEventDate } from '../../utilities';

const EventInfo = ({ event }) => {
  let topAttendees =
    event &&
    event.group &&
    event.group.members &&
    getTopN(event.group.members, 5);
  let topWaitlist = event && event.interested && getTopN(event.interested, 5);
  return (
    <div className="mb-2">
      {event && (
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-sm-4">
                <EventPicEditorContainer event={event} />
              </div>

              <div className="col-sm-8 ">
                <h4>{event.activity}</h4>
                <p>{displayEventDate(event.date)}</p>
                <p>{event.description}</p>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="row m-n2">
              {topAttendees && topAttendees.length > 0 && (
                <div className="col-sm-6">
                  Attendees
                  <ThumbnailStack users={topAttendees} />
                </div>
              )}
              {topWaitlist && topWaitlist.length > 0 && (
                <div className="col-sm-6 border-left pl-4 d-none d-sm-block">
                  Waitlist
                  <ThumbnailStack users={topWaitlist} />
                </div>
              )}
              {topWaitlist && topWaitlist.length > 0 && (
                <div className="col pt-1 border-top d-block d-sm-none">
                  Waitlist
                  <ThumbnailStack users={topWaitlist} />
                </div>
              )}
            </div>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  event: state.userEvents.items[ownProps.eventId]
});
export default connect(mapStateToProps)(EventInfo);
