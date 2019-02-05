import fetch from 'cross-fetch';
import { createAction } from 'redux-act';

const query = `
query ($activityFilter: ActivityFilterInput){
  getEventsByActivity(activityFilter:$activityFilter) {
    id
    description
    activity
    date{
        startDate
        endDate
    }
    image
  }
}
`;

const queryResultToEvents = queryResult => {
  var queriedEvents = queryResult.getEventsByActivity;
  var events = queriedEvents.map(item => ({
    id: item.id, // the Id of the pal
    activity: item.activity,
    //the date the pal is planning on to do the activity
    date: {
      startDate: new Date(Number(item.date.startDate)),
      endDate: new Date(Number(item.date.endDate))
    },
    image: item.image //Url to the pals image
  }));
  return events;
};

/**
 * Fetch Events
 */
export const fetchEventsStarted = createAction('FETCH_EVENTS_STARTED');
export const fetchEventsSucceeded = createAction(
  'FETCH_EVENTS_SUCCEEDED',
  events => ({ events })
);
export const fetchEventsFailed = createAction('FETCH_EVENTS_FAILED', error => ({
  error
}));
export const fetchEventsAsync = () => (dispatch, getState) => {
  dispatch(fetchEventsStarted());
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: { activityFilter: { activity: getState().activity.name } }
    })
  })
    .then(r => r.json())
    .then(json => {
      if (json.data) {
        return dispatch(fetchEventsSucceeded(queryResultToEvents(json.data)));
      } else {
        console.log(`no data field in the result ${JSON.stringify(json)}`);
        throw new Error('no data field in the result');
      }
    });
};
