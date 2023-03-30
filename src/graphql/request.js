import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    // uri: process.env.URL_BACKEND,
    uri: 'https://note-app-server-rdhc.onrender.com',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = localStorage.getItem('accessToken');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
