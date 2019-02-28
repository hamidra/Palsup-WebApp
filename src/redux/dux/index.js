import { combineReducers } from 'redux';
import userReducer from './user';
import userEventsReducer, * as userEvents from './userEvents';
import userPalsReducer, * as userPals from './userPals';
import userConversationsReducer from './userConversations';
import activityReducer, * as activity from './activity';
import activityEventReducer from './activityEvents';
import activityPalReducer, * as activityPals from './activityPals';
import filterReducer from './filter';
import {
  createPal,
  createEvent,
  addToPalsInterested,
  removeFromPalsInterested
} from '../../serviceProviders/graphql/gqlProvider';
import { toPal, toEvent } from '../../serviceProviders/graphql/converters';

const isInterested = (pal, userId) => pal.interested.includes(userId);

export const asyncActions = {
  createPal: () => async (dispatch, getState) => {
    if (!getState().user.didInvalidate && getState().user.info) {
      dispatch(userPals.actions.createPalStarted());
      try {
        var pal = {
          userId: getState().user.info.id,
          activity: getState().activity.name,
          location: getState().activity.location || {
            state: 'WA',
            city: 'Seattle'
          },
          date: getState().activity.date
        };
        var gqlPal = await createPal(pal);
        pal = toPal(gqlPal);
        dispatch(userPals.actions.createPalSucceeded({ [pal.id]: pal }));
        dispatch(activity.actions.userPalCreated(pal));
      } catch (err) {
        console.log(err);
        dispatch(userPals.actions.createPalFailed(err));
      }
    } else {
      console.log('no user is signed in');
    }
  },
  createEvent: (userPal, interestedPal) => async (dispatch, getState) => {
    dispatch(userEvents.actions.createEventStarted());
    try {
      var event = {
        description: `Let's do ${userPal.activity}`,
        activity: userPal.activity,
        location: userPal.location || { state: 'WA', city: 'Seattle' },
        date: userPal.date,
        group: { members: [getState().user.info.id, interestedPal.userId] }
      };
      var gqlEvent = await createEvent(event);
      event = toEvent(gqlEvent);
      dispatch(userEvents.actions.createEventSucceeded(event));
    } catch (err) {
      console.log(err);
      dispatch(userEvents.actions.createEventFailed(err));
    }
  },
  toggleLikePal: (palId, liked) => async (dispatch, getState) => {
    try {
      if (getState().user.info) {
        const state = getState();
        if (liked) {
          const userPal = state.userPals.items[state.activity.palId];
          const likedPal = state.activityPals.items[palId];
          if (userPal && likedPal && isInterested(userPal, likedPal.userId)) {
            dispatch(asyncActions.createEvent(userPal, likedPal));
          }
          await addToPalsInterested(palId, getState().user.info.id);
        } else {
          await removeFromPalsInterested(palId, getState().user.info.id);
        }
        dispatch(activityPals.actions.palToggleLikeSuceeded(palId, liked));
      }
    } catch (err) {
      console.log(`toggling pal like failed with error: ${err}`);
    }
  }
};

export default combineReducers({
  user: userReducer,
  userEvents: userEventsReducer,
  userPals: userPalsReducer,
  userConversations: userConversationsReducer,
  activity: activityReducer,
  activityEvents: activityEventReducer,
  activityPals: activityPalReducer,
  filter: filterReducer
});
