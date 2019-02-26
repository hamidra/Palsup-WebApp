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
  fetchEvents: () => async (dispatch, getState) => {
    const currentUser = getState().user;
    if (currentUser && !currentUser.didInvalidate && currentUser.info) {
      dispatch(actions.fetchEventsStarted());
      try {
        var gqlEvents = await getEventsForUser(currentUser.info.id);
        var events = gqlEvents.reduce((events, gqlEvent) => {
          const event = toEvent(gqlEvent);
          event.id && (events[event.id] = event);
          return events;
        }, {});
        return dispatch(actions.fetchEventsSucceeded(events));
      } catch (err) {
        return dispatch(actions.fetchEventsFailed(err));
      }
    } else {
      console.log('no user is signed in');
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
    }),
    [actions.createEventsSucceeded]: (state, payload) => ({
      ...state,
      items: { ...state.items, ...payload.events }
    })
  },
  initialState.userEvents
);
export default reducer;
