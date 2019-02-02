import * as actions from '../actions/activitySearchActions';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import initialState from './initialState';
import palsReducer from './palsReducer';

const userReducer = createReducer(
  {
    [actions.fetchUserStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchUserSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        info: payload.userInfo
      })
  },
  initialState.user
);

const eventsReducer = createReducer(
  {
    [actions.fetchEventsStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchEventsSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [...payload.events]
      })
  },
  initialState.events
);

const activityReducer = createReducer(
  {
    [actions.activityChange]: (state, payload) =>
      Object.assign({}, state, payload.activity)
  },
  initialState.activity
);

const filtersReducer = createReducer(
  {
    [actions.viewFilterChanged]: (state, payload) =>
      Object.assign({}, state, { viewFilter: payload.viewFilter })
  },
  initialState.filters
);

export default combineReducers({
  user: userReducer,
  activity: activityReducer,
  events: eventsReducer,
  pals: palsReducer,
  filters: filtersReducer
});
