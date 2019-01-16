import React from 'react';
import moment from 'moment';

const EventCard = ({event}) => (
    <div className="card-container col-3 p-2">
        <div className="card">
            <img src={event.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{event.activity}</h5>
                <h6 className="card-subtitle">{moment(event.date).fromNow() || 'anytime!'}</h6>
            </div>
            <div className="card-footer">footer</div>
        </div>
    </div>
);

export default EventCard;