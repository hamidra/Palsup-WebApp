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
