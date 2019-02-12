import * as types from './../types';

const initialState = {
  user: { didInvalidate: false, isFetching: false, info: {}, fetchError: null },
  activity: {},
  events: { didInvalidate: false, isFetching: false, items: [] },
  pals: { didInvalidate: false, isFetching: false, items: [] },
  filter: { viewFilter: types.viewFilter.SHOW_EVENTS }
};

export default initialState;
