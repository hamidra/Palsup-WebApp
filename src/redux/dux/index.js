import { combineReducers } from 'redux';
import userReducer, * as userDux from './user';
import userEventsReducer, * as userEvents from './userEvents';
import userPalsReducer, * as userPals from './userPals';
import userConversationsReducer, * as userConversations from './userConversations';
import activityReducer, * as activity from './activity';
import activityEventReducer, * as activityEvents from './activityEvents';
import activityPalReducer, * as activityPals from './activityPals';
import eventMemberReducer, * as eventMembers from './eventMembers';
import eventWaitlistReducer, * as eventWaitlist from './eventWaitlist';
import filterReducer from './filter';
import * as gql from '../../serviceProviders/graphql/gqlProvider';
import * as converter from '../../serviceProviders/graphql/converters';
import { backend_endpoint } from '../../settings';
import * as enums from '../enums';

const isInterested = (pal, userId) => pal.interested.includes(userId);

export const asyncActions = {
  createPal: () => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      dispatch(userPals.actions.createPalStarted());
      try {
        var pal = {
          userId: user.info.id,
          activity: getState().activity.activity,
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
  fetchUserPalsNotificationsOnTop: () => async (dispatch, getState) => {
    const user = getState().user;
    if ((user && user.isAuthenticated, user.info)) {
      dispatch(userPals.actions.fetchPalsStarted());
      try {
        var notificationCount = 0;
        var palsWithNotificationsIds = [];
        var gqlPalNotifications = await gql.getPalNotificationsForUser(
          user.info.id
        );
        if (gqlPalNotifications && gqlPalNotifications.length > 0) {
          var palsWithNotification = gqlPalNotifications.reduce(
            (pals, gqlNotification) => {
              const pal = converter.toPal(gqlNotification.pal);
              if (pal) {
                notificationCount +=
                  (gqlNotification.info && gqlNotification.info.totalCount) ||
                  0;
                pal.notification = gqlNotification.info;
                pal.id && (pals[pal.id] = pal);
                palsWithNotificationsIds.push(pal.id);
                return pals;
              }
            },
            {}
          );
          dispatch(
            userPals.actions.fetchPalsSucceeded(
              palsWithNotification,
              notificationCount
            )
          );
        }
        var gqlPals = await gql.getPalsForUser(
          user.info.id,
          palsWithNotificationsIds
        );
        var pals = gqlPals.reduce((pals, gqlPal) => {
          var pal = converter.toPal(gqlPal);
          pal.id && (pals[pal.id] = pal);
          return pals;
        }, {});
        return dispatch(
          userPals.actions.fetchPalsSucceeded(pals, notificationCount)
        );
      } catch (err) {
        return dispatch(userPals.actions.fetchPalsFailed(err));
      }
    } else {
      console.log('no user is signed in');
    }
  },
  fetchActivityPals: () => async (dispatch, getState) => {
    dispatch(activityPals.actions.fetchPalsStarted());
    const userId =
      getState().user && getState().user.info && getState().user.isAuthenticated
        ? getState().user.info.id
        : null;
    try {
      const activityFilter = { activity: getState().activity.activity };
      var gqlPals = await gql.getPalsByActivity(userId, activityFilter);
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
        location: userPal.location,
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
  updateEvent: (eventId, eventPatch) => async (dispatch, getState) => {
    dispatch(userEvents.actions.updateEventStarted());
    try {
      var gqlEvent = await gql.updateEvent(eventId, eventPatch);
      var event = converter.toEvent(gqlEvent);
      dispatch(userEvents.actions.updateEventSucceeded(event));
    } catch (err) {
      console.log(err);
      dispatch(userEvents.actions.updateEventFailed(err));
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
      return dispatch(
        userDux.actions.fetchUserSucceeded(converter.toUser(gqlUser))
      );
    } catch (err) {
      return dispatch(userDux.actions.fetchUserFailed(err));
    }
  },
  fetchUserEventsNotificationsOnTop: () => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      dispatch(userEvents.actions.fetchEventsStarted());
      try {
        var notificationCount = 0;
        var eventsWithNotificationsIds = [];
        var gqlEventNotifications = await gql.getEventNotificationsForUser(
          user.info.id
        );
        if (gqlEventNotifications) {
          var eventsWithNotification = gqlEventNotifications.reduce(
            (events, gqlNotification) => {
              const event = converter.toEvent(gqlNotification.event);
              if (event) {
                notificationCount +=
                  (gqlNotification.info && gqlNotification.info.totalCount) ||
                  0;
                event.notification = gqlNotification.info;
                event.id && (events[event.id] = event);
                eventsWithNotificationsIds.push(event.id);
                return events;
              }
            },
            {}
          );
          dispatch(
            userEvents.actions.fetchEventsSucceeded(
              eventsWithNotification,
              notificationCount
            )
          );
        }
        var gqlEvents = await gql.getEventsForUser(
          user.info.id,
          eventsWithNotificationsIds
        );
        var events = gqlEvents.reduce((events, gqlEvent) => {
          const event = converter.toEvent(gqlEvent);
          event.id && (events[event.id] = event);
          return events;
        }, {});
        return await dispatch(
          userEvents.actions.fetchEventsSucceeded(events, notificationCount)
        );
      } catch (err) {
        return dispatch(userEvents.actions.fetchEventsFailed(err));
      }
    } else {
      console.log('no user is signed in');
    }
  },
  fetchNotificationCounts: () => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      try {
        var gqlNotificationCount = await gql.getNotificationCountsForUser(
          user.info.id
        );
        dispatch(
          userEvents.actions.fetchEventNotificationCountSucceeded(
            gqlNotificationCount.event
          )
        );
        dispatch(
          userPals.actions.fetchPalNotificationCountSucceeded(
            gqlNotificationCount.pal
          )
        );
      } catch (err) {
        console.log('fetching notifications for user failed');
      }
    } else {
      console.log('no user is signed in');
    }
  },
  markEventNotificationsAsSeen: eventId => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      try {
        let seenCount = await gql.markEventNotificationsAsSeen(
          user.info.id,
          eventId
        );
        dispatch(
          userEvents.actions.markNotificationsAsSeen(eventId, seenCount || 0)
        );
      } catch (err) {
        console.log(`marking notifications failed with ${err}`);
      }
    } else {
      console.log('no user is signed in');
    }
  },
  markPalNotificationsAsSeen: palId => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      try {
        let seenCount = await gql.markPalNotificationsAsSeen(
          user.info.id,
          palId
        );
        dispatch(
          userPals.actions.markNotificationsAsSeen(palId, seenCount || 0)
        );
      } catch (err) {
        console.log(`marking notifications failed with ${err}`);
      }
    } else {
      console.log('no user is signed in');
    }
  },
  fetchActivityEvents: () => async (dispatch, getState) => {
    dispatch(activityEvents.actions.fetchEventsStarted());
    const userId =
      getState().user && getState().user.info && getState().user.isAuthenticated
        ? getState().user.info.id
        : null;
    try {
      const activityFilter = { activity: getState().activity.activity };
      var gqlEvents = await gql.getEventsByActivity(userId, activityFilter);
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
    const state = getState();
    if (state.user && state.user.isAuthenticated && state.user.info) {
      try {
        if (liked) {
          await gql.addToPalsInterested(palId, state.activity.palId);
        } else {
          await gql.removeFromPalsInterested(palId, getState().user.info.id);
        }
        dispatch(activityPals.actions.palToggleLikeSucceeded(palId, liked));
      } catch (err) {
        console.log(`toggling pal like failed with error: ${err}`);
      }
    } else {
      console.log('no user is signed in');
    }
  },
  toggleLikeEvent: (eventId, liked) => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.isAuthenticated && user.info) {
      try {
        if (liked) {
          await gql.addToEventsWaitlist(eventId, user.info.id);
        } else {
          await gql.removeFromEventsWaitlist(eventId, user.info.id);
        }
        dispatch(
          activityEvents.actions.eventToggleLikeSucceeded(eventId, liked)
        );
      } catch (err) {
        console.log(`toggling event like failed with error: ${err}`);
      }
    } else {
      console.log('no user is signed in');
    }
  },
  submitVoteOnEventWaitlist: (eventId, waitlistUserId, vote) => async (
    dispatch,
    getState
  ) => {
    if (getState().user && getState().user.info) {
      try {
        dispatch(
          eventWaitlist.actions.removeFromEventWaitlist(eventId, waitlistUserId)
        );
        await gql.submitVoteOnEventsWaitlist(eventId, waitlistUserId, vote);
        dispatch(
          userEvents.actions.removeFromEventWaitlist(eventId, waitlistUserId)
        );
      } catch (err) {
        console.log(`submitVoteOnEventWaitlist failed with error: ${err}`);
      }
    } else {
      console.log('no user is signed in');
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
  fetchEventMembers: eventId => async (dispatch, getState) => {
    dispatch(eventMembers.actions.fetchEventMembersStarted());
    try {
      let members = await gql.getEventMembers(eventId);
      dispatch(
        eventMembers.actions.fetchEventMembersSucceeded(eventId, members)
      );
    } catch (err) {
      dispatch(eventMembers.actions.fetchEventMembersFailed(err));
    }
  },
  fetchEventWaitlist: eventId => async (dispatch, getState) => {
    dispatch(eventWaitlist.actions.fetchEventWaitlistStarted());
    try {
      let waitlist = await gql.getEventWaitlist(eventId);
      dispatch(
        eventWaitlist.actions.fetchEventWaitlistSucceeded(eventId, waitlist)
      );
    } catch (err) {
      dispatch(eventWaitlist.actions.fetchEventWaitlistFailed(err));
    }
  },
  sendMessageToEvent: (eventId, messageContent) => async (
    dispatch,
    getState
  ) => {
    const { user } = getState();
    if (user && user.info) {
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
              absolutePicture: {
                thumbnail: user.info.absolutePicture.thumbnail
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
    } else {
      console.log('no user is signed in');
    }
  },
  uploadProfilePic: image => async (dispatch, getState) => {
    const user = getState().user;
    if (user && user.info && user.info.id) {
      dispatch(userDux.actions.uploadProfilePicStarted());
      try {
        let fd = new FormData();
        fd.append('profilePic', image);
        let response = await fetch(
          `${backend_endpoint}/uploader/user/${user.info.id}`,
          {
            method: 'POST',
            body: fd
          }
        );
        if (response.ok) {
          let absolutePicture = await response.json();
          dispatch(userDux.actions.uploadProfilePicSucceeded(absolutePicture));
        } else {
          throw new Error(`upload failed. http ${response.status}`);
        }
      } catch (err) {
        dispatch(userDux.actions.uploadProfilePicFailed(err));
      }
    }
  },
  uploadEventPic: (eid, image) => async (dispatch, getState) => {
    if (eid) {
      dispatch(userEvents.actions.uploadEventPicStarted());
      try {
        let fd = new FormData();
        fd.append('eventPic', image);
        let response = await fetch(
          `${backend_endpoint}/uploader/event/${eid}`,
          {
            method: 'POST',
            body: fd
          }
        );
        if (response.ok) {
          let absoluteImage = await response.json();
          if (absoluteImage) {
            dispatch(
              userEvents.actions.uploadEventPicSucceeded(eid, absoluteImage)
            );
          }
        } else {
          throw new Error(`upload failed. http ${response.status}`);
        }
      } catch (err) {
        dispatch(userEvents.actions.uploadEventPicFailed(err));
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
  eventMembers: eventMemberReducer,
  eventWaitlist: eventWaitlistReducer,
  filter: filterReducer
});
