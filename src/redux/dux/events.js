import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getEventsByActivity } from '../../webClients/graphql/apiProvider';
import { toEvent } from '../../webClients/graphql/converters';

export const actions = {
  fetchEventsStarted: createAction('FETCH_EVENTS_STARTED'),
  fetchEventsSucceeded: createAction('FETCH_EVENTS_SUCCEEDED', events => ({
    events
  })),
  fetchEventsFailed: createAction('FETCH_EVENTS_FAILED', error => ({
    error
  }))
};

export const asyncActions = {
  fetchEvents: () => async (dispatch, getState) => {
    dispatch(actions.fetchEventsStarted());
    try {
      const activityFilter = { activity: getState().activity.name };
      var gqlEvents = await getEventsByActivity(activityFilter);
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
  initialState.events
);
export default reducer;
