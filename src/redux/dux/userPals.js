import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import {
  getPalsForUser,
  createPal
} from '../../webClients/graphql/apiProvider';
import { toPal } from '../../webClients/graphql/converters';

export const actions = {
  fetchPalsStarted: createAction('USERPALS/FETCH_PALS_STARTED'),
  fetchPalsSucceeded: createAction('USERPALS/FETCH_PALS_SUCCEEDED', pals => ({
    pals
  })),
  fetchPalsFailed: createAction('USERPALS/FETCH_PALS_FAILED', error => ({
    error
  })),
  createPalStarted: createAction('USERPALS/CREATE_PAL_STARTED'),
  createPalSucceeded: createAction('USERPALS/CREATE_PAL_SUCCEEDED', pal => ({
    pal
  })),
  createPalFailed: createAction('USERPALS/CREATE_PAL_FAILED', error => ({
    error
  }))
};

export const asyncActions = {
  createPal: () => async (dispatch, getState) => {
    if (!getState().user.didInvalidate && getState().user.info) {
      dispatch(actions.createPalStarted());
      try {
        var pal = {
          userId: getState().user.info.id,
          activity: getState().activity.name,
          location: getState().activity.location,
          date: getState().activity.date
        };
        var gqlPal = await createPal(pal);
        dispatch(actions.createPalSucceeded(toPal(gqlPal)));
      } catch (err) {
        console.log(err);
        dispatch(actions.createPalFailed(err));
      }
    }
    console.log('no user is signed in');
  },
  fetchPals: userId => async (dispatch, getState) => {
    dispatch(actions.fetchPalsStarted());
    try {
      var gqlPals = await getPalsForUser(userId);
      var pals = gqlPals.map(gqlPal => toPal(gqlPal));
      return dispatch(actions.fetchPalsSucceeded(pals));
    } catch (err) {
      return dispatch(actions.fetchPalsFailed(err));
    }
  }
};

const reducer = createReducer(
  {
    [actions.fetchPalsStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchPalsSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [...payload.pals]
      }),
    [actions.createPalSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        items: [...state.items, payload.pal]
      })
  },
  initialState.userPals
);
export default reducer;
