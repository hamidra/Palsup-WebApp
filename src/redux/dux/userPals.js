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
  markNotificationsAsSeen: createAction(
    'USERPALS/MARK_NOTIFICATION_AS_SEEN',
    (palId, seenCount) => ({ palId, seenCount })
  )
};

const reducer = createReducer(
  {
    [actions.fetchPalsStarted]: state => ({
      ...state,
      isFetching: true,
      items: {}
    }),
    [actions.fetchPalsSucceeded]: (state, payload) => ({
      ...state,
      isFetching: false,
      items: { ...state.items, ...payload.pals }
    }),
    [actions.createPalSucceeded]: (state, payload) => ({
      ...state,
      items: { ...state.items, ...payload.pal }
    }),
    [actions.palInterestNotificationRecieved]: (state, payload) => {
      let targetPal = state.items[payload.palId];
      let newState = {
        ...state,
        notificationCount: state.notificationCount || 0 + 1
      };
      if (targetPal) {
        let totalCount =
          (targetPal.notification && targetPal.notification.totalCount) ||
          0 + 1;
        let newInterestCount =
          (targetPal.notification && targetPal.notification.newInterestCount) ||
          0 + 1;
        targetPal = {
          ...targetPal,
          notification: {
            ...targetPal.notification,
            ...{
              totalCount,
              newInterestCount,
              newInterestedUsers: [
                ...((targetPal.notification &&
                  targetPal.notification.newInterestedUsers) ||
                  []),
                payload.interestedUserId
              ]
            }
          }
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
    [actions.markNotificationsAsSeen]: (state, payload) => {
      let newState = state;
      let pal = state.items && state.items[payload.palId];
      if (pal) {
        newState = {
          ...state,
          notificationCount:
            state.notificationCount &&
            state.notificationCount > payload.seenCount
              ? state.notificationCount - payload.seenCount
              : 0,
          items: {
            ...state.items,
            [pal.id]: { ...pal, notification: undefined }
          }
        };
      }
      return newState;
    }
  },
  initialState.userPals
);
export default reducer;
