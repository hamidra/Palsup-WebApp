import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  activityChanged: createAction('ACTIVITY/ACTIVITY_CHANGED', activity => ({
    activity
  }))
};

const reducer = createReducer(
  {
    [actions.activityChanged]: (state, payload) =>
      Object.assign({}, state, payload.activity)
  },
  initialState.activity
);
export default reducer;
