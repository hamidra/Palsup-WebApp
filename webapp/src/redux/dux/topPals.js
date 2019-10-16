import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

export const actions = {
  fetchPalsStarted: createAction('TOPPALS/FETCH_PALS_STARTED'),
  fetchPalsSucceeded: createAction('TOPPALS/FETCH_PALS_SUCCEEDED', pals => ({
    pals
  })),
  fetchPalsFailed: createAction('TOPPALS/FETCH_PALS_FAILED', error => ({
    error
  })),
  palToggleLikeSucceeded: createAction(
    'TOPPALS/PAL_TOGGLE_LIKE_SUCCEEDED',
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
  initialState.topPals
);
export default reducer;
