import { GraphQLClient } from 'graphql-request';

const IsProduction = process.env.NODE_ENV === 'production';
const HostUrl = IsProduction ? '' : 'http://127.0.0.1:5001';
const endpoint = `${HostUrl}/admin-api/graphql`;

export function fetcher(token, query, variables) {

    console.log(`object`, { token, query, variables })

    const graphQLClient = new GraphQLClient(endpoint, {
        withCredentials: true,
        credentials: 'include',
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });

    return graphQLClient.request(query, variables);
}

export async function Request({ token, mutation, variables }) {

    const graphQLClient = new GraphQLClient(endpoint, {
        withCredentials: true,
        credentials: 'include',
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });

    try {
        return await graphQLClient.request(mutation, variables)
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2))
        let err = new Error("There is an error in the response from the service");
        err.response = error.response
        err.status = error.response.status
        throw err
    }
}