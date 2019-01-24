import { createAction } from 'redux-act';
import fetch from 'cross-fetch';
import getMockEvents from '../mocks/MockEvents';
import getMockPals from '../mocks/MockPals';

/**
 * view Filters
 */
export const viewFilter = Object.freeze({
  SHOW_EVENTS: 'SHOW_EVENTS',
  SHOW_PALS: 'SHOW_PALS'
});
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
  var fetchPromise = new Promise(resolve => resolve(getMockPals()));
  dispatch(fetchPalsStarted());
  fetchPromise.then(response => dispatch(fetchPalsSucceeded(response)));
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
