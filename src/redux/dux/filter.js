import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  viewFilterChanged: createAction('FILTER/VIEW_FILTER_CHANGED', viewFilter => ({
    viewFilter
  }))
};

const reducer = createReducer(
  {
    [actions.viewFilterChanged]: (state, payload) => ({
      ...state,
      viewFilter: payload.viewFilter
    })
  },
  initialState.filter
);
export default reducer;
