import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  activityChanged: createAction('ACTIVITY/ACTIVITY_CHANGED', activity => ({
    activity
  })),
  userPalCreated: createAction('ACTIVITY/USER_PAL_CREATED', pal => ({ pal }))
};

const reducer = createReducer(
  {
    [actions.activityChanged]: (state, payload) => ({
      ...state,
      ...payload.activity
    }),
    [actions.userPalCreated]: (state, payload) => ({
      ...state,
      name: payload.pal.activity,
      palId: payload.pal.id
    })
  },
  initialState.activity
);
export default reducer;
