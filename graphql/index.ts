import { GraphQLClient } from 'graphql-request';

import { Logs } from '@/lib/index';

const IsProduction = process.env.NODE_ENV === 'production';
const HostUrl = IsProduction
  ? process.env.ADMIN_API_URL
  : 'http://127.0.0.1:5001';
const endpoint = `${HostUrl}/graphql`;

export function fetcher(token, query, variables) {
  const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  return graphQLClient.request(query, variables);
}

interface RequestType {
  token: string;
  mutation: string;
  variables?: Object;
}

export async function Request({ token, mutation, variables }: RequestType) {
  const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  try {
    return await graphQLClient.request(mutation, variables);
  } catch (error: any) {
    Logs({ message: 'graphQLClient.request', error });
    let err = new Error('There is an error in the response from the service');
    err['response'] = error?.response;
    err['status'] = error?.response.status;
    throw err;
  }
}
