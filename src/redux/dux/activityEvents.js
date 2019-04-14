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
  ),
  eventToggleLikeSucceeded: createAction(
    'ACTIVITYEVENTS/EVENT_TOGGLE_LIKE_SUCCEEDED',
    (eventId, liked) => ({
      eventId,
      liked
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
    }),
    [actions.eventToggleLikeSucceeded]: (state, payload) => {
      if (payload.eventId) {
        return {
          ...state,
          items: {
            ...state.items,
            [payload.eventId]: {
              ...state.items[payload.eventId],
              liked: payload.liked
            }
          }
        };
      }
    }
  },
  initialState.activityEvents
);
export default reducer;
