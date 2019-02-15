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
      }
    }`;
  var data = await graphqlCall({ query, variables: { user: user } });
  return data.createUser;
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
      }
    }`;
  var data = await graphqlCall({ query, variables: { pal: pal } });
  return data.createPal;
};

export const getPalsByActivity = async activityFilter => {
  const query = `
    query ($activityFilter: ActivityFilterInput){
      getPalsByActivity(activityFilter:$activityFilter) {
        id,
        user{
          picture {
            large
          }
        }
        activity
        date{
          startDate
          endDate
        }
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
        date{
            startDate
            endDate
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
