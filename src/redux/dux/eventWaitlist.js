import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchEventWaitlistStarted: createAction(
    'EVENTWAITLIST/FETCH_EVENT_WAITLIST_STARTED'
  ),
  fetchEventWaitlistSucceeded: createAction(
    'EVENTWAITLIST/FETCH_EVENT_WAITLIST_SUCCEEDED',
    (eventId, waitlist) => ({
      eventId,
      waitlist
    })
  ),
  fetchEventWaitlistFailed: createAction(
    'EVENTWAITLIST/FETCH_EVENT_WAITLIST_FAILED',
    error => ({
      error
    })
  ),
  removeFromEventWaitlist: createAction(
    'EVENTWAITLIST/REMOVE_FROM_WAITLIST',
    (eventId, userId) => ({ eventId, userId })
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
    }),
    [actions.removeFromEventWaitlist]: (state, payload) => {
      let waitlist = state.items && state.items[payload.eventId];
      let newState = state;
      if (waitlist) {
        waitlist = waitlist.filter(user => user.id != payload.userId);
        newState = {
          ...state,
          items: { ...state.items, [payload.eventId]: [...waitlist] }
        };
      }
      return newState;
    }
  },
  initialState.eventWaitlist
);
export default reducer;
