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

export const asyncActions = {
  fetchEvents: () => async (dispatch, getState) => {
    dispatch(actions.fetchEventsStarted());
    try {
      const activityFilter = { activity: getState().activity.name };
      var gqlEvents = await getEventsByActivity(activityFilter);
      var events = gqlEvents.reduce((events, gqlEvent) => {
        const event = toEvent(gqlEvent);
        event.id && (events[event.id] = event);
        return events;
      }, {});
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
  initialState.activityEvents
);
export default reducer;
