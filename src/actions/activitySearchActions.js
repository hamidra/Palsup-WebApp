import { createAction } from 'redux-act';
import getMockEvents from '../mocks/MockEvents';

export const viewFilterChanged = createAction(
  'VIEW_FILTER_CHANGED',
  viewFilter => ({ viewFilter })
);

/**
 * Fetch User
 */
export const fetchUserStarted = createAction('FETCH_USER_STARTED');
export const fetchUserSucceeded = createAction(
  'FETCH_USER_SUCCEEDED',
  userInfo => ({ userInfo })
);
export const fetchUserFailed = createAction('FETCH_USER_FAILED', error => ({
  error
}));

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
  var fetchPromise = new Promise(resolve => resolve(getMockEvents()));
  dispatch(fetchEventsStarted());
  fetchPromise.then(response => dispatch(fetchEventsSucceeded(response)));
};

/**
 * Activity Search
 */
export const activityChange = createAction('ACTIVITY_CHANGE', activity => ({
  activity
}));

/**
 * Login
 */
export const loggedIn = createAction('LOGGED_IN');
export const loggedOut = createAction('LOGGED_OUT');

/**
 * Like
 */
export const likedEvent = createAction('LIKED_EVENT');
export const likedPal = createAction('LIKED_PAL');
