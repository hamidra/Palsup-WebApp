import { graphqlCall } from './client';

const locationFragment = `
  address
  city
  state
  coordinates {
    latitude
    longitude
    raidus
  }
`;

const dateRangeFragment = `
  startDate
  endDate
`;

const nameFragment = `
  first
  last
`;

const pictureFragment = `
  large
  medium
  thumbnail
`;

export const createUser = async user => {
  const query = `
    mutation($user:UserInput){
      createUser(user:$user ) {
          id
          name{
            ${nameFragment}
          }
          gender
          registrationDate
          dob
          email
          cell
          location{
           ${locationFragment}
          }
          absolutePicture{
            ${pictureFragment}
          }
      }
    }`;
  var data = await graphqlCall({ query, variables: { user: user } });
  return data.createUser;
};

export const updateUser = async (id, user) => {
  const query = `
    mutation($id:ID!, $user:UserInput){
      updateUser(id:$id, user:$user ) {
          id
          name{
            ${nameFragment}
          }
          gender
          registrationDate
          dob
          email
          cell
          location{
            ${locationFragment}
          }
          absolutePicture{
            ${pictureFragment}
          }
      }
    }`;
  var data = await graphqlCall({ query, variables: { id: id, user: user } });
  return data.updateUser;
};

export const getUserByAuthInfo = async authInfo => {
  const query = `
  query ($authInfo:AuthInfoInput){
    getUserByAuthInfo(authInfo:$authInfo) {
      id
      name{
        ${nameFragment}
      }
      gender
      registrationDate
      dob
      email
      cell
      location{
        ${locationFragment}
      }
      absolutePicture{
        ${pictureFragment}
      }
    }
  }`;
  var data = await graphqlCall({
    query,
    variables: { authInfo }
  });
  return data.getUserByAuthInfo;
};

export const createPal = async pal => {
  const query = `
    mutation($pal:PalInput){
      createPal(pal:$pal ) {
        id,
        activity
        location {
         ${locationFragment}
        }
        date{
         ${dateRangeFragment}
        }
        interested
      }
    }`;
  var data = await graphqlCall({ query, variables: { pal: pal } });
  return data.createPal;
};

export const addToPalsInterested = async (palId, userId) => {
  const query = `
  mutation($palId:ID!, $userId:ID!){
    addToPalsInterested(palId:$palId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { palId: palId, userId: userId }
  });
  return data.addToPalsInterested;
};

export const removeFromPalsInterested = async (palId, userId) => {
  const query = `
  mutation($palId:ID!, $userId:ID!){
    removeFromPalsInterested(palId:$palId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { palId: palId, userId: userId }
  });
  return data.removeFromPalsInterested;
};

export const addToEventsWaitlist = async (eventId, userId) => {
  const query = `
  mutation($eventId:ID!, $userId:ID!){
    addToEventsWaitlist(eventId:$eventId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { eventId: eventId, userId: userId }
  });
  return data.addToEventsWaitlist;
};

export const removeFromEventsWaitlist = async (eventId, userId) => {
  const query = `
  mutation($eventId:ID!, $userId:ID!){
    removeFromEventsWaitlist(eventId:$eventId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { eventId: eventId, userId: userId }
  });
  return data.removeFromEventsWaitlist;
};

export const submitVoteOnEventsWaitlist = async (
  eventId,
  waitlistUserId,
  vote
) => {
  const query = `
  mutation($eventId:ID!, $waitlistUserId:ID!, $vote:Boolean){
    submitVoteOnEventsWaitlist(eventId:$eventId, waitlistUserId:$waitlistUserId, vote:$vote)
  }`;
  var data = await graphqlCall({
    query,
    variables: { eventId, waitlistUserId, vote }
  });
  return data.addToEventsMembers;
};

export const getPalsByActivity = async (userId, activityFilter) => {
  const query = `
    query ($userId: ID, $activityFilter: ActivityFilterInput){
      getPalsByActivity(userId:$userId, activityFilter:$activityFilter) {
        id,
        user {
          id
          name {
            ${nameFragment}
          }
          absolutePicture {
            ${pictureFragment}
          }
        }
        activity
        date {
         ${dateRangeFragment}
        }
        location {
          ${locationFragment}
        }
        interested
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId, activityFilter: activityFilter }
  });
  return data.getPalsByActivity;
};

export const getPalsForUser = async (userId, excludeIds) => {
  const query = `
    query ($userId: ID!, $excludeIds:[ID]){
      getPalsForUserSortedByDate(userId:$userId, excludeIds:$excludeIds) {
        id
        activity
        date{
          ${dateRangeFragment}
        }
        interested
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId, excludeIds }
  });
  return data.getPalsForUserSortedByDate;
};
export const getPalNotificationsForUser = async userId => {
  const query = `
    query ($userId: ID!){
      getPalNotificationsForUser(userId:$userId) {
        pal {
          id
          activity
          date{
            ${dateRangeFragment}
          }
          interested
        }
        info {
          totalCount
          newInterestCount
          date
        }
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId }
  });
  return data.getPalNotificationsForUser;
};

export const createEvent = async event => {
  const query = `
    mutation($event:EventInput){
      createEvent(event:$event ) {
        id
        description
        activity
        date {
            ${dateRangeFragment}
        }
        location {
          ${locationFragment}
        }
        absoluteImage
      }
    }`;
  var data = await graphqlCall({ query, variables: { event: event } });
  return data.createEvent;
};

export const updateEvent = async (id, patch) => {
  const query = `
    mutation($id:ID!, $patch: EventInput){
      updateEvent(id:$id, patch:$patch ) {
        id
        description
        activity
        date {
           ${dateRangeFragment}
        }
        location {
          ${locationFragment}
        }
        group {
          members {
            id
            absolutePicture {
              ${pictureFragment}
            }
          }
          waitlist {
            id
            absolutePicture {
              ${pictureFragment}
            }
          } 
        }
        absoluteImage
      }
    }`;
  var data = await graphqlCall({ query, variables: { id, patch } });
  return data.updateEvent;
};

export const getEventsByActivity = async (userId, activityFilter) => {
  const query = `
    query ($userId:ID, $activityFilter: ActivityFilterInput){
      getEventsByActivity(userId:$userId, activityFilter:$activityFilter) {
        id
        description
        activity
        date {
          ${dateRangeFragment}
        }
        location {
          ${locationFragment}
        }
        group {
          members {
            id
            absolutePicture {
              ${pictureFragment}
            }
          }
          waitlist {
            id
            absolutePicture {
              ${pictureFragment}
            }
          } 
        }
        absoluteImage
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId, activityFilter: activityFilter }
  });
  return data.getEventsByActivity;
};

export const getEventsForUser = async (userId, excludeIds) => {
  const query = `
    query ($userId: ID!, $excludeIds:[ID]){
      getEventsForUserSortedByDate(userId:$userId, excludeIds:$excludeIds) {
        id
        description
        activity
        date {
          ${dateRangeFragment}
        }
        location {
          ${locationFragment}
        }
        group {
          members {
            id
            absolutePicture {
              ${pictureFragment}
            }
          }
          waitlist {
            id
            absolutePicture {
              ${pictureFragment}
            }
          }
        }
        absoluteImage
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId, excludeIds }
  });
  return data.getEventsForUserSortedByDate;
};

export const getEventNotificationsForUser = async userId => {
  const query = `
    query ($userId: ID!){
      getEventNotificationsForUser(userId:$userId) {
        event {
          id
          description
          activity
          date {
            ${dateRangeFragment}
          }
          location {
            ${locationFragment}
          }
          group {
            members {
              id
              absolutePicture {
                ${pictureFragment}
              }
            }
            waitlist {
              id
              absolutePicture {
                ${pictureFragment}
              }
            }
          }
          absoluteImage
        }
        info {
          totalCount
          new
          newMessageCount
          newInterestCount
          date
        }
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId }
  });
  return data.getEventNotificationsForUser;
};

export const getEventConversation = async eventId => {
  const query = `
  query ($eventId: ID!) {
    getEventConversation(eventId:$eventId) {
      id
      group {
        conversation {
          from {
            id
            name {
              ${nameFragment}
            }
            absolutePicture {
              ${pictureFragment}
            }
          }
          to
          type
          content {
            text
          }
        }
      }
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { eventId: eventId }
  });
  return data.getEventConversation;
};

export const getEventMembers = async eventId => {
  const query = `
  query ($eventId: ID!){
    getEventMembers(eventId:$eventId) {
      id
      name {
        ${nameFragment}
      }
      absolutePicture {
        ${pictureFragment}
      }
      gender,
      dob,
      location {
        ${locationFragment}
      }
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { eventId: eventId }
  });
  return data.getEventMembers;
};

export const getEventWaitlist = async eventId => {
  const query = `
  query ($eventId: ID!){
    getEventWaitlist(eventId:$eventId) {
      id
      name {
        ${nameFragment}
      }
      absolutePicture {
        ${pictureFragment}
      }
      gender,
      dob,
      location {
        ${locationFragment}
      }
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { eventId: eventId }
  });
  return data.getEventWaitlist;
};

export const getNotificationsForUser = async (userId, type) => {
  const query = `
  query ($userId: ID!, $type:NotificationType){
    getNotificationsForUser(userId:$userId, type:$type) {
      id
      user
      target
      type
      creationDate
      data
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { userId, type }
  });
  return data.getNotificationsForUser;
};

export const getNotificationReportForUser = async userId => {
  const query = `
  query ($userId: ID!){
    getNotificationReportForUser(userId:$userId) {
      type
      count
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { userId }
  });
  return data.getNotificationReportForUser;
};

export const markEventNotificationsAsSeen = async (userId, eventId) => {
  const query = `
  mutation($userId:ID, $eventId:ID){
    markNotificationAsSeen(userId:$userId, eventId:$eventId)
  }`;
  const data = await graphqlCall({
    query,
    variables: { userId, eventId }
  });
  return data.markEventNotificationsAsSeen;
};

export const markPalNotificationsAsSeen = async (userId, palId) => {
  const query = `
  mutation($userId:ID, $palId:ID){
    markPalNotificationsAsSeen(userId:$userId, palId:$palId)
  }`;
  const data = await graphqlCall({
    query,
    variables: { userId, palId }
  });
  return data.markPalNotificationsAsSeen;
};

export const sendMessage = async message => {
  const query = `
  mutation($message: MessageInput) {
    sendMessage(message:$message)
  }`;
  const data = await graphqlCall({
    query,
    variables: { message }
  });
  return data.sendMessage;
};
