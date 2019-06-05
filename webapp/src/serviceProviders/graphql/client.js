import fetch from 'cross-fetch';
import { backend_endpoint } from '../../settings';

const serverUrl = `${backend_endpoint}/graphql`;

export const graphqlCall = async query => {
  console.log(JSON.stringify(query));
  var result = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(query)
  });
  var json = await result.json();
  console.log(json);
  if (json.errors) {
    throw new Error(json.errors);
  } else if (!json.data) {
    throw new Error('no data was returned');
  } else {
    return json.data;
  }
};
