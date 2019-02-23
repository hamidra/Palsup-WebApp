import { graphqlCall } from './client';

export const createUser = async user => {
  const query = `
    mutation($user:UserInput){
      createUser(user:$user ) {
          id
          name{
            first
            last
          }
          gender
          registrationDate
          dob
          email
          cell
          location{
            city
            state
            coordinates{
              latitude
              longitude
            }
          }
          picture{
            large
            medium
            thumbnail
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
            first
            last
          }
          gender
          registrationDate
          dob
          email
          cell
          location{
            city
            state
            coordinates{
              latitude
              longitude
            }
          }
          picture{
            large
            medium
            thumbnail
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
        first
        last
      }
      gender
      registrationDate
      dob
      email
      cell
      location{
        coordinates{
          latitude
          longitude
        }
      }
      picture{
        large
        medium
        thumbnail
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
        date{
          startDate
          endDate
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
  return data.addToPalsInterested;
};

export const getPalsByActivity = async activityFilter => {
  const query = `
    query ($activityFilter: ActivityFilterInput){
      getPalsByActivity(activityFilter:$activityFilter) {
        id,
        user {
          id
          name {
            first
            last
          }
          picture {
            large
          }
        }
        activity
        date {
          startDate
          endDate
        }
        location {
          state
          city
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
          startDate
          endDate
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
        date{
            startDate
            endDate
        }
        image
      }
    }`;
  var data = await graphqlCall({ query, variables: { event: event } });
  return data.createEvent;
};

export const getEventsByActivity = async activityFilter => {
  const query = `
    query ($activityFilter: ActivityFilterInput){
      getEventsByActivity(activityFilter:$activityFilter) {
        id
        description
        activity
        date{
            startDate
            endDate
        }
        group {
          members {
            picture {
              thumbnail
            }
          }
        }
        image
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
            startDate
            endDate
        }
        group {
          members {
            thumbnails
          }
        }
        image
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
  query ($eventId: ID!){
    getEventConversation(eventId:$eventId)
    {
      from{
        id
        name{
          first
          last
        }
        picture{
          thumbnail
        }
      }
      content{
        text
      }
    }
  }`;
  const data = await graphqlCall({
    query,
    variables: { eventId: eventId }
  });
  return data.getEventConversation;
};
