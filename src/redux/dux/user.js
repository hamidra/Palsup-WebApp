import { createAction, createReducer } from 'redux-act';
import { createUser } from '../../webClients/graphql/apiProvider';
import { toUser } from '../../webClients/graphql/converters';
import initialState from './initialState';

export const actions = {
  fetchUserStarted: createAction('FETCH_USER_STARTED'),
  fetchUserSucceeded: createAction('FETCH_USER_SUCCEEDED', userInfo => ({
    userInfo
  })),
  fetchUserFailed: createAction('FETCH_USER_FAILED', error => ({
    error
  })),
  createUserStarted: createAction('CREATE_USER_STARTED'),
  createUserSucceeded: createAction('CREATE_USER_SUCCEEDED', userInfo => ({
    userInfo
  })),
  createUserFailed: createAction('CREATE_USER_FAILED', error => ({
    error
  })),

  /**
   * Login
   */
  loggedIn: createAction('LOGGED_IN'),
  loggedOut: createAction('LOGGED_OUT'),

  /**
   * Like
   */
  likedEvent: createAction('LIKED_EVENT'),
  likedPal: createAction('LIKED_PAL')
};

export const asyncActions = {
  createUser: user => async (dispatch, getState) => {
    dispatch(actions.createUserStarted());
    try {
      var gqlUser = await createUser(user);
      dispatch(actions.createUserSucceeded(toUser(gqlUser)));
    } catch (err) {
      dispatch(actions.createUserFailed(err));
    }
  }
};

const reducer = createReducer(
  {
    [actions.fetchUserStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchUserSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        info: payload.userInfo
      }),
    [actions.createUserSucceeded]: (state, payload) =>
      Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        info: payload.userInfo
      })
  },
  initialState.user
);
export default reducer;
