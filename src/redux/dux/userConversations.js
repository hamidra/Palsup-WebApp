import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getEventConversation } from '../../serviceProviders/graphql/gqlProvider';
import { toEventConversation } from '../../serviceProviders/graphql/converters';

export const actions = {
  fetchConversationStarted: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_CONVERSATION_STARTED'
  ),
  fetchConversationSucceeded: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_CONVERSATION_SUCCEEDED',
    conversation => ({
      conversation
    })
  ),
  fetchConversationFailed: createAction(
    'USERCONVERSATIONS/FETCH_EVENT_CONVERSATION_FAILED',
    error => ({
      error
    })
  ),
  sendMessageStarted: createAction('USERCONVERSATIONS/SEND_MESSAGE_STARTED'),
  sendMessageSucceeded: createAction(
    'USERCONVERSATIOSNS/SEND_MESSAGE_SUCCEEDED',
    message => ({
      message
    })
  ),
  sendMessageFailed: createAction(
    'USERCONVERSATIONS/SEND_MESSAGE_FAILED',
    error => ({
      error
    })
  )
};

export const asyncActions = {
  fetchEventConversation: eventId => async (dispatch, getState) => {
    dispatch(actions.fetchConversationStarted());
    try {
      const gqlEventConversation = await getEventConversation(eventId);
      const conversation = toEventConversation(gqlEventConversation);
      return dispatch(
        actions.fetchConversationSucceeded({
          [conversation.id]: conversation
        })
      );
    } catch (err) {
      return dispatch(actions.fetchEventConversationFailed(err));
    }
  }
};

const reducer = createReducer(
  {
    [actions.fetchConversationStarted]: state => ({
      ...state,
      isFetching: true
    }),
    [actions.fetchConversationSucceeded]: (state, payload) => ({
      ...state,
      didInvalidate: false,
      isFetching: false,
      items: { ...state.items, ...payload.conversation }
    })
  },
  initialState.userConversations
);
export default reducer;
