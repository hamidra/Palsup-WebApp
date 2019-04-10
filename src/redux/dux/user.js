import { createAction, createReducer } from 'redux-act';
import {
  createUser,
  updateUser,
  getUserByAuthInfo
} from '../../serviceProviders/graphql/gqlProvider';
import { toUser } from '../../serviceProviders/graphql/converters';
import initialState from './initialState';

const persistUserState = (state, userState) => {
  const newUserState = { ...state, ...userState };
  localStorage.setItem('user', JSON.stringify(newUserState));
  return newUserState;
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
  updateUserStarted: createAction('USER/UPDATE_USER_STARTED'),
  updateUserSucceeded: createAction('USER/UPDATE_USER_SUCCEEDED', userInfo => ({
    userInfo
  })),
  updateUserFailed: createAction('USER/UPDATE_USER_FAILED', error => ({
    error
  })),
  uploadProfilePicStarted: createAction('USER/UPLOAD_PROFILE_PIC_STARTED'),
  uploadProfilePicFailed: createAction(
    'USER/UPLOAD_PROFILE_PIC_FAILED',
    error => ({ error })
  ),
  uploadProfilePicSucceeded: createAction(
    'USER/UPLOAD_PROFILE_PIC_SUCCEEDED',
    absolutePicture => ({ absolutePicture })
  ),
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

const reducer = createReducer(
  {
    [actions.fetchUserStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        info: payload.userInfo
      });
    },
    [actions.createUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        info: payload.userInfo
      });
    },
    [actions.updateUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        info: payload.userInfo
      });
    },
    [actions.uploadProfilePicSucceeded]: (state, payload) => {
      return persistUserState(state, {
        info: state.info && { ...state.info, ...payload }
      });
    }
  },
  initialState.user
);
export default reducer;
