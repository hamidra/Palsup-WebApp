import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getEventsForUser } from '../../serviceProviders/graphql/gqlProvider';
import { toEvent } from '../../serviceProviders/graphql/converters';

export const actions = {
  fetchEventsStarted: createAction('USEREVENTS/FETCH_EVENTS_STARTED'),
  fetchEventsSucceeded: createAction(
    'USEREVENTS/FETCH_EVENTS_SUCCEEDED',
    events => ({
      events
    })
  ),
  fetchEventsFailed: createAction('USEREVENTS/FETCH_EVENTS_FAILED', error => ({
    error
  })),
  createEventStarted: createAction('USEREVENTS/CREATE_EVENT_STARTED'),
  createEventSucceeded: createAction(
    'USEREVENTS/CREATE_EVENT_SUCCEEDED',
    events => ({
      events
    })
  ),
  createEventFailed: createAction('USEREVENTS/CREATE_EVENT_FAILED', error => ({
    error
  }))
};

export const asyncActions = {
  fetchEvents: userId => async (dispatch, getState) => {
    dispatch(actions.fetchEventsStarted());
    try {
      var gqlEvents = await getEventsForUser(userId);
      var events = gqlEvents.reduce((events, gqlEvent) => {
        const event = toEvent(gqlEvent);
        event.id && (events[event.id] = event);
        return events;
      });
      return dispatch(actions.fetchEventsSucceeded(events));
    } catch (err) {
      return dispatch(actions.fetchEventsFailed(err));
    }
  }
};

const reducer = createReducer(
  {
    [actions.fetchEventsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchEventsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: { ...payload.events }
    })
  },
  initialState.userEvents
);
export default reducer;
