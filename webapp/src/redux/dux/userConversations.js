import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

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
  ),
  newMessageNotificationRecieved: createAction(
    'USERCONVERSATIONS/NEWMESSAGE_NOTIFICATION_RECIEVED',
    message => ({
      message
    })
  )
};

const addMessageToState = (state, message) => {
  const conversationId = message.to;
  var messages;
  if (state.items[conversationId]) {
    messages = [...state.items[conversationId].messages, message];
  } else {
    messages = [message];
  }
  return {
    ...state,
    items: {
      ...state.items,
      [conversationId]: {
        ...state.items[conversationId],
        messages: messages
      }
    }
  };
};

const reducer = createReducer(
  {
    [actions.fetchConversationStarted]: state => ({
      ...state,
      isFetching: true
    }),
    [actions.fetchConversationSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...state.items, ...payload.conversation }
    }),
    [actions.sendMessageSucceeded]: (state, payload) =>
      addMessageToState(state, payload.message),
    [actions.newMessageNotificationRecieved]: (state, payload) =>
      addMessageToState(state, payload.message)
  },
  initialState.userConversations
);
export default reducer;
