import * as types from './../types';

const initialState = {
  user: {
    timestamp: Date.now(),
    isFetching: false,
    info: null,
    fetchError: null
  },
  userEvents: {
    timestamp: Date.now(),
    isFetching: false,
    notificationCount: 0,
    items: {}
  },
  userPals: {
    timestamp: Date.now(),
    isFetching: false,
    items: {}
  },
  userConversations: {
    timestamp: Date.now(),
    isFetching: false,
    items: {}
  },
  activity: {
    activity: '',
    location: null,
    date: null,
    palId: null
  },
  activityEvents: { timestamp: Date.now(), isFetching: false, items: {} },
  activityPals: { timestamp: Date.now(), isFetching: false, items: {} },
  filter: { viewFilter: types.viewFilter.SHOW_EVENTS }
};

export default initialState;
