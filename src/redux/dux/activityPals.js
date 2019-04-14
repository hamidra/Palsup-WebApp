import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getPalsByActivity } from '../../serviceProviders/graphql/gqlProvider';
import { toPal } from '../../serviceProviders/graphql/converters';

export const actions = {
  fetchPalsStarted: createAction('ACTIVITYPALS/FETCH_PALS_STARTED'),
  fetchPalsSucceeded: createAction(
    'ACTIVITYPALS/FETCH_PALS_SUCCEEDED',
    pals => ({ pals })
  ),
  fetchPalsFailed: createAction('ACTIVITYPALS/FETCH_PALS_FAILED', error => ({
    error
  })),
  palToggleLikeSucceeded: createAction(
    'ACTIVITYPALS/PAL_TOGGLE_LIKE_SUCCEEDED',
    (palId, liked) => ({
      palId,
      liked
    })
  )
};

const reducer = createReducer(
  {
    [actions.fetchPalsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchPalsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...payload.pals }
    }),
    [actions.palToggleLikeSucceeded]: (state, payload) => {
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
