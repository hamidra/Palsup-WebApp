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
    [actions.newEventNotificationRecieved]: (state, payload) => ({
      ...state,
      notificationCount: state.notificationCount + 1,
      items: { ...state.items, ...payload.event }
    }),
    [actions.newMessageNotificationRecieved]: (state, payload) => {
      var targetEvent = state.items[payload.message.to];
      var newState = {
        ...state,
        notificationCount: state.notificationCount + 1
      };
      if (targetEvent) {
        targetEvent.notificationCount = targetEvent.notificationCount + 1;
        newState.items = {
          ...state.items,
          ...{ [payload.message.to]: targetEvent }
        };
      } else {
        newState.items = { ...state.items };
      }
      return newState;
    }
  },
  initialState.userEvents
);
export default reducer;
