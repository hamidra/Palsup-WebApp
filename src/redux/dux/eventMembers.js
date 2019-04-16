import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchEventMembersStarted: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_MEMBERS_STARTED'
  ),
  fetchEventMembersSucceeded: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_MEMBERS_SUCCEEDED',
    (eventId, members) => ({
      eventId,
      members
    })
  ),
  fetchEventMembersFailed: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_MEMBERS_FAILED',
    error => ({
      error
    })
  )
};

const reducer = createReducer(
  {
    [actions.fetchEventMembersStarted]: state => ({
      ...state,
      isFetching: true
    }),
    [actions.fetchEventMembersSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...state.items, [payload.eventId]: [...payload.members] }
    })
  },
  initialState.eventMembers
);
export default reducer;
