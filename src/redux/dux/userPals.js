import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getPalsForUser } from '../../serviceProviders/graphql/gqlProvider';
import { toPal } from '../../serviceProviders/graphql/converters';

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

const reducer = createReducer(
  {
    [actions.fetchPalsStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchPalsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...payload.pals }
    }),
    [actions.createPalSucceeded]: (state, payload) => ({
      ...state,
      items: { ...state.items, ...payload.pal }
    })
  },
  initialState.userPals
);
export default reducer;
