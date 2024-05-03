"use client";

const {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} = require("@apollo/client");

export const Provider = ({ children }) => {
  const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default Provider;
