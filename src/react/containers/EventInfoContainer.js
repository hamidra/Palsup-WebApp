import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventPicEditorContainer from './EventPicEditorContainer';
import { displayEventDate } from '../../utilities';
import EventMemberContainer from '../containers/EventMemberContainer';
import EventWaitlistContainer from '../containers/EventWaitlistContainer';
import EditableEventInfoModalContainer from '../containers/EditableEventInfoModalContainer';

const EventInfo = ({ event }) => {
  let attendeesCount =
    (event &&
      event.group &&
      event.group.members &&
      event.group.members.length) ||
    0;
  let waitlistCount =
    (event && event.interested && event.interested.length) || 0;
  return (
    <div className="mb-2">
      {event && (
        <Card className="shadow">
          <Card.Body>
            <div className="row">
              <div className="col-sm-4">
                <EventPicEditorContainer event={event} />
              </div>
              <div className="col-sm-8 ">
                <EditableEventInfoModalContainer event={event} />
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="row m-n2">
              {attendeesCount > 0 && (
                <div className="col-sm-6">
                  Attendees
                  <EventMemberContainer event={event} />
                </div>
              )}
              {waitlistCount > 0 && (
                <div className="col-sm-6 border-left pl-4 d-none d-sm-block">
                  Waitlist
                  <EventWaitlistContainer event={event} />
                </div>
              )}
              {waitlistCount > 0 && (
                <div className="col pt-1 border-top d-block d-sm-none">
                  Waitlist
                  <EventWaitlistContainer event={event} />
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
