import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchEventMembersStarted: createAction(
    'EVENTMEMBERS/FETCH_EVENT_MEMBERS_STARTED'
  ),
  fetchEventMembersSucceeded: createAction(
    'EVENTMEMBERS/FETCH_EVENT_MEMBERS_SUCCEEDED',
    (eventId, members) => ({
      eventId,
      members: members.filter(e => e) //remove the null elements
    })
  ),
  fetchEventMembersFailed: createAction(
    'EVENTMEMBERS/FETCH_EVENT_MEMBERS_FAILED',
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
