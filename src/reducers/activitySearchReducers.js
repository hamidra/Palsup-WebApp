import * as actions from '../actions/activitySearchActions';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

var initialState = {
  user: { didInvalidate: false, isFetching: false, info: {}, fetchError: null },
  activity: {},
  events: { didInvalidate: false, isFetching: false, items: [] },
  pals: { didInvalidate: false, isFetching: false, items: [] },
  filters: { viewFilter: actions.viewFilter.SHOW_EVENTS }
};
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

const palsReducer = createReducer(
  {
    [actions.fetchPalsStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchPalsSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [...payload.pals]
      })
  },
  initialState.pals
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
