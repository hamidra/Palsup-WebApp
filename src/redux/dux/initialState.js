import * as types from './../types';

const initialState = {
  user: {
    didInvalidate: true,
    isFetching: false,
    info: null,
    fetchError: null
  },
  userEvents: { didInvalidate: true, isFetching: false, items: {} },
  userPals: { didInvalidate: true, isFetching: false, items: {} },
  activity: {
    name: '',
    location: null,
    palId: null
  },
  activityEvents: { didInvalidate: true, isFetching: false, items: {} },
  activityPals: { didInvalidate: true, isFetching: false, items: {} },
  filter: { viewFilter: types.viewFilter.SHOW_EVENTS }
};

export default initialState;
