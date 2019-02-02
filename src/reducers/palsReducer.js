import * as actions from '../actions/asyncFetchPals';
import { createReducer } from 'redux-act';
import initialState from './initialState';

const palsReducer = createReducer(
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
  initialState.pals
);

export default palsReducer;
