import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchEventWaitlistStarted: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_WAITLIST_STARTED'
  ),
  fetchEventWaitlistSucceeded: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_WAITLIST_SUCCEEDED',
    (eventId, waitlist) => ({
      eventId,
      waitlist
    })
  ),
  fetchEventWaitlistFailed: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_WAITLIST_FAILED',
    error => ({
      error
    })
  )
};

const reducer = createReducer(
  {
    [actions.fetchEventWaitlistStarted]: state => ({
      ...state,
      isFetching: true
    }),
    [actions.fetchEventWaitlistSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...state.items, [payload.eventId]: [...payload.waitlist] }
    })
  },
  initialState.eventWaitlist
);
export default reducer;
