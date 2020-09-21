import React from 'react'
// import {useQuery,useMutation} from '@apollo/react-
import {ApolloLink} from "apollo-link";
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache, HttpLink}from 'apollo-boost';
import {apiPath} from '../../Config'
import fetch from 'isomorphic-unfetch';
import cookie from 'react-cookies'

const WrapRootElement = ({children, initialState}) => {
    let token = cookie.load("token");
    // Polyfill fetch() on the server (used by apollo-client)
    if (!process.browser) {
        global.fetch = fetch
    }
    // Create First Link
    const firstLink = new HttpLink({
        uri: apiPath + "/private/graphql",
        headers: token ? token : "",
        // other link options...
    });

    // Create Second Link
    const secondLink = new HttpLink({
        uri: apiPath+"/graphql",
        headers: ""
        // other link options...
    });

    const client = new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.split(
            operation => operation.getContext().clientName === "second", // Routes the query to the proper client
            secondLink,
            firstLink
        ),
        cache: new InMemoryCache().restore(initialState || {})
    });
    return (
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}

export default WrapRootElement;