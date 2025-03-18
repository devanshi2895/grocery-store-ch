import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_CH_URL,
  headers: { "X-GQL-Token": process.env.NEXT_PUBLIC_XGQLTOKEN },
  cache: new InMemoryCache(),
});

export default client;
