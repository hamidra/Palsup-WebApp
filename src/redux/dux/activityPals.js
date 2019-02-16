import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import {
  getPalsByActivity,
  addToPalsInterested,
  removeFromPalsInterested
} from '../../serviceProviders/graphql/gqlProvider';
import { toPal } from '../../serviceProviders/graphql/converters';

const checkForMatch = (userPal, likedPal) =>
  userPal.interested.includes(likedPal.userId) &&
  likedPal.interested.includes(userPal.userId);

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
      var pals = gqlPals.reduce((pals, gqlPal) => {
        const pal = toPal(gqlPal);
        pal.id && (pals[pal.id] = pal);
        return pals;
      }, {});
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
    [actions.fetchPalsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchPalsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: { ...payload.pals }
    }),
    [actions.palToggleLikeSuceeded]: (state, payload) => {
      if (payload.palId) {
        return {
          ...state,
          items: {
            ...state.items,
            [payload.palId]: {
              ...state.items[payload.palId],
              liked: payload.liked
            }
          }
        };
      }
    }
  },
  initialState.activityPals
);
export default reducer;
