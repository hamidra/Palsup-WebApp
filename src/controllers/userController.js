import { graphqlFetch } from '../helpers';

export const createUser = user => {
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
  return graphqlFetch({ query, variables: { user: user } });
};
