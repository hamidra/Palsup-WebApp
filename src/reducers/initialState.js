import viewFilter from '../actions/viewFilter';

const initialState = {
  user: { didInvalidate: false, isFetching: false, info: {}, fetchError: null },
  activity: {},
  events: { didInvalidate: false, isFetching: false, items: [] },
  pals: { didInvalidate: false, isFetching: false, items: [] },
  filters: { viewFilter: viewFilter.SHOW_EVENTS }
};

export default initialState;
