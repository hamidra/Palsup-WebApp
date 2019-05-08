import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchEventsStarted: createAction('USEREVENTS/FETCH_EVENTS_STARTED'),
  fetchEventsSucceeded: createAction(
    'USEREVENTS/FETCH_EVENTS_SUCCEEDED',
    (events, notificationCount) => ({
      events,
      notificationCount
    })
  ),
  fetchEventsFailed: createAction('USEREVENTS/FETCH_EVENTS_FAILED', error => ({
    error
  })),
  createEventStarted: createAction('USEREVENTS/CREATE_EVENT_STARTED'),
  createEventSucceeded: createAction(
    'USEREVENTS/CREATE_EVENT_SUCCEEDED',
    event => ({
      event: { [event.id]: event }
    })
  ),
  createEventFailed: createAction('USEREVENTS/CREATE_EVENT_FAILED', error => ({
    error
  })),
  updateEventStarted: createAction('USEREVENTS/UPDATE_EVENT_STARTED'),
  updateEventSucceeded: createAction(
    'USEREVENTS/UPDATE_EVENT_SUCCEEDED',
    event => ({ event })
  ),
  updateEventFailed: createAction('USEREVENTS/UPDATE_EVENT_FAILED', error => ({
    error
  })),
  newEventNotificationRecieved: createAction(
    'USEREVENTS/NEW_EVENT_NOTIFICATION_RECIEVED',
    event => ({
      event: { [event.id]: { ...event, notificationCount: 1 } }
    })
  ),
  newMessageNotificationRecieved: createAction(
    'USEREVENTS/NEW_MESSAGE_NOTIFICATION_RECIEVED',
    message => ({
      message
    })
  ),
  fetchEventNotificationCountSucceeded: createAction(
    'USEREVENTS/FETCH_EVENT_NOTIFICATION_COUNT_SUCCEEDED',
    notificationCount => ({ notificationCount })
  ),
  uploadEventPicStarted: createAction('USEREVENTS/UPLOAD_EVENT_PIC_STARTED'),
  uploadEventPicFailed: createAction(
    'USEREVENTS/UPLOAD_EVENT_PIC_FAILED',
    error => ({ error })
  ),
  uploadEventPicSucceeded: createAction(
    'USEREVENTS/UPLOAD_EVENT_PIC_SUCCEEDED',
    (eventId, absoluteImage) => ({ eventId, absoluteImage })
  ),
  removeFromEventWaitlist: createAction(
    'USEREVENTS/REMOVE_FROM_EVENT_WAITLIST',
    (eventId, userId) => ({ eventId, userId })
  ),
  markNotificationsAsSeen: createAction(
    'USEREVENTS/MARK_NOTIFICATION_AS_SEEN',
    (eventId, seenCount) => ({ eventId, seenCount })
  )
};

const reducer = createReducer(
  {
    [actions.fetchEventsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchEventsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      notificationCount: payload.notificationCount,
      items: { ...payload.events }
    }),
    [actions.createEventSucceeded]: (state, payload) => ({
      ...state,
      items: { ...state.items, ...payload.event }
    }),
    [actions.updateEventSucceeded]: (state, payload) =>
      (payload.event && {
        ...state,
        items: {
          ...state.items,
          [payload.event.id]: {
            ...state.items[payload.event.id],
            ...payload.event
          }
        }
      }) ||
      state,
    [actions.newEventNotificationRecieved]: (state, payload) => ({
      ...state,
      notificationCount: state.notificationCount + 1,
      items: { ...state.items, ...payload.event }
    }),
    [actions.newMessageNotificationRecieved]: (state, payload) => {
      let targetEvent = state.items && state.items[payload.message.to];
      let newState = {
        ...state,
        notificationCount: state.notificationCount + 1
      };
      if (targetEvent) {
        targetEvent = {
          ...targetEvent,
          notificationCount: targetEvent.notificationCount
            ? targetEvent.notificationCount + 1
            : 1
        };
        newState.items = {
          ...state.items,
          ...{ [payload.message.to]: targetEvent }
        };
      } else {
        newState.items = { ...state.items };
      }
      return newState;
    },
    [actions.uploadEventPicSucceeded]: (state, payload) => {
      let targetEvent = state.items && state.items[payload.eventId];
      targetEvent = { ...targetEvent, absoluteImage: payload.absoluteImage };
      return {
        ...state,
        items: { ...state.items, ...{ [payload.eventId]: targetEvent } }
      };
    },
    [actions.removeFromEventWaitlist]: (state, payload) => {
      let event = state.items && state.items[payload.eventId];
      let newState = state;
      if (event) {
        let eventWaitlist =
          event.group &&
          event.group.waitlist &&
          event.group.waitlist.filter(user => user.id !== payload.userId);
        if (eventWaitlist) {
          newState = {
            ...state,
            items: {
              ...state.items,
              [payload.eventId]: {
                ...event,
                group: { ...event.group, waitlist: [...eventWaitlist] }
              }
            }
          };
        }
      }
      return newState;
    },
    [actions.fetchEventNotificationCountSucceeded]: (state, payload) => ({
      ...state,
      notificationCount: payload.notificationCount
    }),
    [actions.markNotificationsAsSeen]: (state, payload) => {
      let newState = state;
      let event = state.items && state.items[payload.eventId];
      if (event) {
        newState = {
          ...state,
          notificationCount: state.notificationCount - payload.seenCount,
          items: {
            ...state.items,
            [event.id]: { ...event, notification: undefined }
          }
        };
      }
      return newState;
    }
  },
  initialState.userEvents
);
export default reducer;
