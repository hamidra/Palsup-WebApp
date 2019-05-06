import { createAction, createReducer } from 'redux-act';
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
  loggedOut: createAction('LOGGED_OUT')
};

const reducer = createReducer(
  {
    [actions.fetchUserStarted]: state => ({ ...state, isFetching: true }),
    [actions.fetchUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        isAuthenticated: true,
        info: payload.userInfo
      });
    },
    [actions.createUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        isAuthenticated: true,
        info: payload.userInfo
      });
    },
    [actions.updateUserSucceeded]: (state, payload) => {
      return persistUserState(state, {
        isFetching: false,
        isAuthenticated: true,
        info: payload.userInfo
      });
    },
    [actions.uploadProfilePicSucceeded]: (state, payload) => {
      return persistUserState(state, {
        info: state.info && { ...state.info, ...payload }
      });
    },
    [actions.loggedOut]: state => {
      return persistUserState(state, {
        isAuthenticated: false,
        info: {}
      });
    }
  },
  initialState.user
);
export default reducer;
