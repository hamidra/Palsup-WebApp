import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';
import { getPalsByActivity } from '../../webClients/graphql/apiProvider';
import { toPal } from '../../webClients/graphql/converters';

export const actions = {
  fetchPalsStarted: createAction('ACTIVITYPALS/FETCH_PALS_STARTED'),
  fetchPalsSucceeded: createAction(
    'ACTIVITYPALS/FETCH_PALS_SUCCEEDED',
    pals => ({ pals })
  ),
  fetchPalsFailed: createAction('ACTIVITYPALS/FETCH_PALS_FAILED', error => ({
    error
  }))
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
      })
  },
  initialState.activityPals
);
export default reducer;
