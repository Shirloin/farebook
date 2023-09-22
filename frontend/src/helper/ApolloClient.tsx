import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from 'graphql-ws';

const httpLink = createUploadLink({
    uri: 'http://localhost:7778/query',
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:7778/query',
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token")

    operation.setContext({
        headers: {
            Authorization: token ? token : '',
        },
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: authMiddleware.concat(splitLink),
    // link: splitLink,
    cache: new InMemoryCache()
});

export default client;