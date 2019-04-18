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

export const addToEventsInterested = async (eventId, userId) => {
  const query = `
  mutation($eventId:ID!, $userId:ID!){
    addToEventsInterested(eventId:$eventId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { eventId: eventId, userId: userId }
  });
  return data.addToEventsInterested;
};

export const removeFromEventsInterested = async (eventId, userId) => {
  const query = `
  mutation($eventId:ID!, $userId:ID!){
    removeFromEventsInterested(eventId:$eventId, userId:$userId)
  }`;
  var data = await graphqlCall({
    query,
    variables: { eventId: eventId, userId: userId }
  });
  return data.removeFromEventsInterested;
};

export const getPalsByActivity = async activityFilter => {
  const query = `
    query ($activityFilter: ActivityFilterInput){
      getPalsByActivity(activityFilter:$activityFilter) {
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
    variables: { activityFilter: activityFilter }
  });
  return data.getPalsByActivity;
};

export const getPalsForUser = async userId => {
  const query = `
    query ($userId: ID!){
      getPalsForUser(userId:$userId) {
        id,
        activity
        date{
          ${dateRangeFragment}
        }
        interested
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId }
  });
  return data.getPalsForUser;
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
        absoluteImage
      }
    }`;
  var data = await graphqlCall({ query, variables: { id, patch } });
  return data.updateEvent;
};

export const getEventsByActivity = async activityFilter => {
  const query = `
    query ($activityFilter: ActivityFilterInput){
      getEventsByActivity(activityFilter:$activityFilter) {
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
        }
        interested {
          id
          absolutePicture {
            ${pictureFragment}
          }
        } 
        absoluteImage
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { activityFilter: activityFilter }
  });
  return data.getEventsByActivity;
};

export const getEventsForUser = async userId => {
  const query = `
    query ($userId: ID!){
      getEventsForUser(userId:$userId) {
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
        }
        interested {
          id
          absolutePicture {
            ${pictureFragment}
          }
        }
        absoluteImage
      }
    }`;
  var data = await graphqlCall({
    query,
    variables: { userId: userId }
  });
  return data.getEventsForUser;
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
