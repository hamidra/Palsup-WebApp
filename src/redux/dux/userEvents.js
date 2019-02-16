import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getEventsForUser } from '../../webClients/graphql/gqlProvider';
import { toEvent } from '../../webClients/graphql/converters';

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
  }))
};

export const asyncActions = {
  fetchEvents: userId => async (dispatch, getState) => {
    dispatch(actions.fetchEventsStarted());
    try {
      var gqlEvents = await getEventsForUser(userId);
      var events = gqlEvents.map(gqlEvent => toEvent(gqlEvent));
      return dispatch(actions.fetchEventsSucceeded(events));
    } catch (err) {
      return dispatch(actions.fetchEventsFailed(err));
    }
  }
};

const reducer = createReducer(
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
  initialState.userEvents
);
export default reducer;
