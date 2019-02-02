import fetch from 'cross-fetch';
import { createAction } from 'redux-act';

const query = `
query {
  pals {
    id,
    user{
      picture {
        large
      }
    }
    activity{
      type
    }
  }
}`;

const queryResultToPals = queryResult => {
  var queriedPals = queryResult.pals;
  var pals = queriedPals.map(item => ({
    id: item.id, // the Id of the pal
    activity: {
      type: item && item.activity && item.activity.type
    },
    //the date the pal is planning on to do the activity
    date: {
      startDate: '2019-04-23T18:25:43.511Z',
      endDate: '2019-04-29T18:25:43.511Z'
    },
    image: 'https://randomuser.me/api/portraits/men/60.jpg' //Url to the pals image
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
  fetch('http://localhost:3000/mockGraphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })
    .then(r => r.json())
    .then(json => dispatch(fetchPalsSucceeded(queryResultToPals(json.data))));
};
