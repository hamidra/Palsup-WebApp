import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

const EventInfo = ({ event }) => {
  return (
    <div className="mb-2">
      <Card className="p-1">
        {event && (
          <div className="row">
            <div className="col-sm-4">
              <img src={event.image} />
            </div>
            <Card.Body className="col-sm-8 ">
              <h4>{event.activity}</h4>
              <p>{event.description}</p>
            </Card.Body>
          </div>
        )}
      </Card>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  event: state.userEvents.items[ownProps.eventId]
});
export default connect(mapStateToProps)(EventInfo);
