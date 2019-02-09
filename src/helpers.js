import fetch from 'cross-fetch';

export const graphqlFetch = query => {
  console.log(JSON.stringify(query));
  return fetch('http://192.168.1.221:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(query)
  });
};
