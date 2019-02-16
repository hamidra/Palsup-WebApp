import { createAction, createReducer } from 'redux-act';
import {
  createUser,
  getUserByAuthInfo
} from '../../webClients/graphql/gqlProvider';
import { toUser } from '../../webClients/graphql/converters';
import initialState from './initialState';

const persistUserState = (state, userState) => {
  localStorage.setItem('user', JSON.stringify(userState));
  return Object.assign({}, state, userState);
};

export const actions = {
  fetchUserStarted: createAction('USER/FETCH_USER_STARTED'),
  fetchUserSucceeded: createAction('USER/FETCH_USER_SUCCEEDED', userInfo => ({
    userInfo
  })),
  fetchUserFailed: createAction('USER/FETCH_USER_FAILED', error => ({
    error
  })),
  createUserStarted: createAction('USER/CREATE_USER_STARTED'),
  createUserSucceeded: createAction('USER/CREATE_USER_SUCCEEDED', userInfo => ({
    userInfo
  })),
  createUserFailed: createAction('USER/CREATE_USER_FAILED', error => ({
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
  likedEvent: createAction('LIKED_EVENT')
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
  },
  fetchUserByAuthInfo: authInfo => async (dispatch, getState) => {
    dispatch(actions.fetchUserStarted());
    try {
      var gqlUser = await getUserByAuthInfo(authInfo);
      dispatch(actions.fetchUserSucceeded(toUser(gqlUser)));
    } catch (err) {
      dispatch(actions.fetchUserFailed(err));
    }
  }
};

const reducer = createReducer(
  {
    [actions.fetchUserStarted]: state =>
      Object.assign({}, state, { isFetching: true }),
    [actions.fetchUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        didInvalidate: false,
        info: payload.userInfo
      });
    },
    [actions.createUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        didInvalidate: false,
        info: payload.userInfo
      });
    }
  },
  initialState.user
);
export default reducer;
