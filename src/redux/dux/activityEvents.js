import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getEventsByActivity } from '../../serviceProviders/graphql/gqlProvider';
import { toEvent } from '../../serviceProviders/graphql/converters';

export const actions = {
  fetchEventsStarted: createAction('ACTIVITYEVENTS/FETCH_EVENTS_STARTED'),
  fetchEventsSucceeded: createAction(
    'ACTIVITYEVENTS/FETCH_EVENTS_SUCCEEDED',
    events => ({
      events
    })
  ),
  fetchEventsFailed: createAction(
    'ACTIVITYEVENTS/FETCH_EVENTS_FAILED',
    error => ({
      error
    })
  )
};

const reducer = createReducer(
  {
    [actions.fetchEventsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchEventsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...payload.events }
    })
  },
  initialState.activityEvents
);
export default reducer;
