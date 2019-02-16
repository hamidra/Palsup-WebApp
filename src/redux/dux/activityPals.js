import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import {
  getPalsByActivity,
  addToPalsInterested,
  removeFromPalsInterested
} from '../../webClients/graphql/gqlProvider';
import { toPal } from '../../webClients/graphql/converters';

export const actions = {
  fetchPalsStarted: createAction('ACTIVITYPALS/FETCH_PALS_STARTED'),
  fetchPalsSucceeded: createAction(
    'ACTIVITYPALS/FETCH_PALS_SUCCEEDED',
    pals => ({ pals })
  ),
  fetchPalsFailed: createAction('ACTIVITYPALS/FETCH_PALS_FAILED', error => ({
    error
  })),
  palToggleLikeSuceeded: createAction(
    'ACTIVITYPALS/PAL_TOGGLE_LIKE_SUCCEEDED',
    (palId, liked) => ({
      palId,
      liked
    })
  )
};

export const asyncActions = {
  fetchPals: () => async (dispatch, getState) => {
    dispatch(actions.fetchPalsStarted());
    try {
      const activityFilter = { activity: getState().activity.name };
      var gqlPals = await getPalsByActivity(activityFilter);
      var pals = gqlPals.map(gqlPal => toPal(gqlPal));
      return dispatch(actions.fetchPalsSucceeded(pals));
    } catch (err) {
      return dispatch(actions.fetchPalsFailed(err));
    }
  },
  toggleLikePal: (palId, liked) => async (dispatch, getState) => {
    try {
      if (getState().user.info) {
        if (liked) {
          await addToPalsInterested(palId, getState().user.info.id);
        } else {
          await removeFromPalsInterested(palId, getState().user.info.id);
        }
        dispatch(actions.palToggleLikeSuceeded(palId, liked));
      }
    } catch (err) {
      console.log(`toggling pal like failed with error: ${err}`);
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
    [actions.palToggleLikeSuceeded]: (state, payload) =>
      Object.assign({}, state, {
        items: state.items.map(pal => {
          if (pal.id != payload.palId) {
            return pal;
          } else {
            return Object.assign({}, pal, { liked: payload.liked });
          }
        })
      })
  },
  initialState.activityPals
);
export default reducer;
