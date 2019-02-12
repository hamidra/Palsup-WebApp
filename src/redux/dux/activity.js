import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  activityChange: createAction('ACTIVITY/ACTIVITY_CHANGE', activity => ({
    activity
  }))
};

const reducer = createReducer(
  {
    [actions.activityChange]: (state, payload) =>
      Object.assign({}, state, payload.activity)
  },
  initialState.activity
);
export default reducer;
