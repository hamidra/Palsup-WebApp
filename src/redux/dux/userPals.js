import { createReducer, createAction } from 'redux-act';
import initialState from './initialState';

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
  })),
  palInterestNotificationRecieved: createAction(
    'USERPALS/PAL_INTEREST_NOTIFICATION_RECIEVED',
    (palId, interestedUserId) => ({ palId, interestedUserId })
  ),
  fetchPalNotificationCountSucceeded: createAction(
    'USERPALS/FETCH_PAL_NOTIFICATION_COUNT_SUCCEEDED',
    notificationCount => ({ notificationCount })
  ),
  markNotificationAsSeen: createAction(
    'USERPALS/MARK_NOTIFICATION_AS_SEEN',
    (target, type, seenCount) => ({ target, type, seenCount })
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
    [actions.createPalSucceeded]: (state, payload) => ({
      ...state,
      items: { ...state.items, ...payload.pal }
    }),
    [actions.palInterestNotificationRecieved]: (state, payload) => {
      let targetPal = state.items[payload.palId];
      let newState = {
        ...state,
        notificationCount: state.notificationCount + 1
      };
      if (targetPal) {
        targetPal = {
          ...targetPal,
          notificationCount: targetPal.notificationCount
            ? targetPal.notificationCount + 1
            : 1
        };
        newState.items = {
          ...state.items,
          ...{ [payload.palId]: targetPal }
        };
      } else {
        newState.items = { ...state.items };
      }
      return newState;
    },
    [actions.fetchPalNotificationCountSucceeded]: (state, payload) => ({
      ...state,
      notificationCount: payload.notificationCount
    }),
    [actions.markNotificationAsSeen]: (state, payload) => {
      let newState = state;
      let pal = state.items && state.items[payload.target];
      if (pal) {
        newState = {
          ...state,
          notificationCount: state.notificationCount - payload.seenCount,
          items: {
            ...state.items,
            [pal.id]: { ...pal, notificationCount: 0 }
          }
        };
      }
      return newState;
    }
  },
  initialState.userPals
);
export default reducer;
