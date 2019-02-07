import fetch from 'cross-fetch';
import { createAction } from 'redux-act';

const query = `
query ($activityFilter: ActivityFilterInput){
  getPalsByActivity(activityFilter:$activityFilter) {
    id,
    user{
      picture {
        large
      }
    }
    activity
    date{
      startDate
      endDate
    }
  }
}`;

const queryResultToPals = queryResult => {
  var queriedPals = queryResult.getPalsByActivity;
  var pals = queriedPals.map(item => ({
    id: item.id, // the Id of the pal
    activity: item.activity,
    //the date the pal is planning on to do the activity
    date: {
      startDate: new Date(Number(item.date.startDate)),
      endDate: new Date(Number(item.date.endDate))
    },
    image: item.user.picture.large
  }));
  return pals;
};

/**
 * Fetch Pals
 */
export const fetchPalsStarted = createAction('FETCH_PALS_STARTED');
export const fetchPalsSucceeded = createAction(
  'FETCH_PALS_SUCCEEDED',
  pals => ({ pals })
);
export const fetchPalsFailed = createAction('FETCH_PALS_FAILED', error => ({
  error
}));

export const fetchPalsAsync = () => (dispatch, getState) => {
  dispatch(fetchPalsStarted());
  return fetch('http://192.168.1.221:3000/graphql', {
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
        return dispatch(fetchPalsSucceeded(queryResultToPals(json.data)));
      } else {
        console.log(`no data field in the result ${JSON.stringify(json)}`);
        throw new Error('no data field in the result');
      }
    });
};
