import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import {
  getEventConversation,
  sendMessage
} from '../../serviceProviders/graphql/gqlProvider';
import { toEventConversation } from '../../serviceProviders/graphql/converters';
import { graphqlCall } from '../../serviceProviders/graphql/client';

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
      return dispatch(actions.fetchConversationFailed(err));
    }
  },
  sendMessageToEvent: (eventId, messageContent) => async (
    dispatch,
    getState
  ) => {
    const { user } = getState();
    if (!user.didInvalidate && user.info) {
      dispatch(actions.sendMessageStarted());
      try {
        var message = {
          from: user.info.id,
          to: eventId,
          type: 'EVENT',
          content: messageContent
        };
        const messageId = await sendMessage(message);
        if (messageId) {
          var submittedMessage = {
            id: messageId,
            from: {
              id: user.info.id,
              name: {
                first: user.info.name.first,
                last: user.info.name.last
              },
              picture: {
                thumbnail: user.info.picture.thumbnail
              }
            },
            to: eventId,
            type: 'EVENT',
            content: messageContent
          };
          return dispatch(actions.sendMessageSucceeded(submittedMessage));
        } else {
          throw new Error('no messageId was returned by server.');
        }
      } catch (err) {
        return dispatch(actions.sendMessageFailed(err));
      }
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
    }),
    [actions.sendMessageSucceeded]: (state, payload) => {
      const conversationId = payload.message.to;
      if (state.items[conversationId]) {
        return {
          ...state,
          items: {
            ...state.items,
            [conversationId]: {
              ...state.items[conversationId],
              messages: [
                ...state.items[conversationId].messages,
                payload.message
              ]
            }
          }
        };
      } else {
        return state;
      }
    }
  },
  initialState.userConversations
);
export default reducer;
