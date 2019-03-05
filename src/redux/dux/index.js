import { combineReducers } from 'redux';
import userReducer, * as userDux from './user';
import userEventsReducer, * as userEvents from './userEvents';
import userPalsReducer, * as userPals from './userPals';
import userConversationsReducer, * as userConversations from './userConversations';
import activityReducer, * as activity from './activity';
import activityEventReducer, * as activityEvents from './activityEvents';
import activityPalReducer, * as activityPals from './activityPals';
import filterReducer from './filter';
import * as gql from '../../serviceProviders/graphql/gqlProvider';
import * as converter from '../../serviceProviders/graphql/converters';

const isInterested = (pal, userId) => pal.interested.includes(userId);

export const asyncActions = {
  createPal: () => async (dispatch, getState) => {
    if (getState().user.info) {
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
        var gqlPal = await gql.createPal(pal);
        pal = converter.toPal(gqlPal);
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
  fetchUserPals: userId => async (dispatch, getState) => {
    dispatch(userPals.actions.fetchPalsStarted());
    try {
      var gqlPals = await gql.getPalsForUser(userId);
      var pals = gqlPals.reduce((pals, gqlPal) => {
        var pal = converter.toPal(gqlPal);
        pal.id && (pals[pal.id] = pal);
        return pals;
      });
      return dispatch(userPals.actions.fetchPalsSucceeded(pals));
    } catch (err) {
      return dispatch(userPals.actions.fetchPalsFailed(err));
    }
  },
  fetchActivityPals: () => async (dispatch, getState) => {
    dispatch(activityPals.actions.fetchPalsStarted());
    try {
      const activityFilter = { activity: getState().activity.name };
      var gqlPals = await gql.getPalsByActivity(activityFilter);
      var pals = gqlPals.reduce((pals, gqlPal) => {
        const pal = converter.toPal(gqlPal);
        pal.id && (pals[pal.id] = pal);
        return pals;
      }, {});
      return dispatch(activityPals.actions.fetchPalsSucceeded(pals));
    } catch (err) {
      return dispatch(activityPals.actions.fetchPalsFailed(err));
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
      var gqlEvent = await gql.createEvent(event);
      event = converter.toEvent(gqlEvent);
      dispatch(userEvents.actions.createEventSucceeded(event));
    } catch (err) {
      console.log(err);
      dispatch(userEvents.actions.createEventFailed(err));
    }
  },
  createUser: user => async (dispatch, getState) => {
    dispatch(userDux.actions.createUserStarted());
    try {
      var gqlUser = await gql.createUser(user);
      dispatch(userDux.actions.createUserSucceeded(converter.toUser(gqlUser)));
    } catch (err) {
      dispatch(userDux.actions.createUserFailed(err));
    }
  },
  updateUser: (id, user) => async (dispatch, getState) => {
    dispatch(userDux.actions.updateUserStarted());
    try {
      var gqlUser = await gql.updateUser(id, user);
      dispatch(userDux.actions.updateUserSucceeded(converter.toUser(gqlUser)));
    } catch (err) {
      dispatch(userDux.actions.updateUserFailed(err));
    }
  },
  fetchUserByAuthInfo: authInfo => async (dispatch, getState) => {
    dispatch(userDux.actions.fetchUserStarted());
    try {
      var gqlUser = await gql.getUserByAuthInfo(authInfo);
      dispatch(userDux.actions.fetchUserSucceeded(converter.toUser(gqlUser)));
    } catch (err) {
      dispatch(userDux.actions.fetchUserFailed(err));
    }
  },
  fetchUserEvents: (markNotifications = true) => async (dispatch, getState) => {
    const currentUser = getState().user;
    if (currentUser && currentUser.info) {
      dispatch(userEvents.actions.fetchEventsStarted());
      try {
        var gqlNotifications = [];
        var notificationCount = 0;
        if (markNotifications) {
          gqlNotifications = await gql.getNotificationsForUser(
            currentUser.info.id
          );
        }
        var gqlEvents = await gql.getEventsForUser(currentUser.info.id);
        var events = gqlEvents.reduce((events, gqlEvent) => {
          const event = converter.toEvent(gqlEvent);
          event.notificationCount = 0;
          event.id && (events[event.id] = event);
          return events;
        }, {});
        gqlNotifications.map(notification => {
          if (events[notification.target]) {
            notificationCount++;
            events[notification.target].notificationCount++;
          }
        });
        await dispatch(
          userEvents.actions.fetchEventsSucceeded(events, notificationCount)
        );
      } catch (err) {
        return dispatch(userEvents.actions.fetchEventsFailed(err));
      }
    } else {
      console.log('no user is signed in');
    }
  },
  fetchUserNotifications: () => async (dispatch, getState) => {
    const currentUser = getState().user;
    if (currentUser && currentUser.info) {
      dispatch(userEvents.actions.fetchEventsStarted());
      try {
        var gqlEvents = await gql.getEventsForUser(currentUser.info.id);
        var events = gqlEvents.reduce((events, gqlEvent) => {
          const event = converter.toEvent(gqlEvent);
          event.id && (events[event.id] = event);
          return events;
        }, {});
        await dispatch(userEvents.actions.fetchEventsSucceeded(events));
      } catch (err) {
        return dispatch(userEvents.actions.fetchEventsFailed(err));
      }
    } else {
      console.log('no user is signed in');
    }
  },
  fetchActivityEvents: () => async (dispatch, getState) => {
    dispatch(activityEvents.actions.fetchEventsStarted());
    try {
      const activityFilter = { activity: getState().activity.name };
      var gqlEvents = await gql.getEventsByActivity(activityFilter);
      var events = gqlEvents.reduce((events, gqlEvent) => {
        const event = converter.toEvent(gqlEvent);
        event.id && (events[event.id] = event);
        return events;
      }, {});
      return dispatch(activityEvents.actions.fetchEventsSucceeded(events));
    } catch (err) {
      return dispatch(activityEvents.actions.fetchEventsFailed(err));
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
          await gql.addToPalsInterested(palId, getState().user.info.id);
        } else {
          await gql.removeFromPalsInterested(palId, getState().user.info.id);
        }
        dispatch(activityPals.actions.palToggleLikeSuceeded(palId, liked));
      }
    } catch (err) {
      console.log(`toggling pal like failed with error: ${err}`);
    }
  },
  fetchEventConversation: eventId => async (dispatch, getState) => {
    dispatch(userConversations.actions.fetchConversationStarted());
    try {
      const gqlEventConversation = await gql.getEventConversation(eventId);
      const conversation = converter.toEventConversation(gqlEventConversation);
      return dispatch(
        userConversations.actions.fetchConversationSucceeded({
          [conversation.id]: conversation
        })
      );
    } catch (err) {
      return dispatch(userConversations.actions.fetchConversationFailed(err));
    }
  },
  sendMessageToEvent: (eventId, messageContent) => async (
    dispatch,
    getState
  ) => {
    const { user } = getState();
    if (user.info) {
      dispatch(userConversations.actions.sendMessageStarted());
      try {
        var message = {
          from: user.info.id,
          to: eventId,
          type: 'EVENT',
          content: messageContent
        };
        const messageId = await gql.sendMessage(message);
        if (messageId) {
          var submittedMessage = {
            id: messageId,
            from: {
              id: user.info.id,
              name: {
                first: user.info.name.first,
                last: user.info.name.last
              },
              picture: {
                thumbnail: user.info.picture.thumbnail
              }
            },
            to: eventId,
            type: 'EVENT',
            content: messageContent
          };
          return dispatch(
            userConversations.actions.sendMessageSucceeded(submittedMessage)
          );
        } else {
          throw new Error('no messageId was returned by server.');
        }
      } catch (err) {
        return dispatch(userConversations.actions.sendMessageFailed(err));
      }
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
