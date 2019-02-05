import * as actions from '../actions/asyncFetchEvents';
import { createReducer } from 'redux-act';
import initialState from './initialState';

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

export default eventsReducer;
