import * as types from '../enums';

const initialState = {
  user: {
    timestamp: Date.now(),
    isFetching: false,
    isAuthenticated: false,
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
    notificationCount: 0,
    items: {}
  },
  userConversations: {
    timestamp: Date.now(),
    isFetching: false,
    items: {}
  },
  eventMembers: {
    timestamp: Date.now(),
    isFetching: false,
    items: {}
  },
  eventWaitlist: {
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
  topPals: { timestamp: Date.now(), isFetching: false, items: {} },
  filter: { viewFilter: types.viewFilter.SHOW_PALS }
};

export default initialState;
