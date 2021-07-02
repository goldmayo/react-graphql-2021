import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const CACHE = new InMemoryCache();
const LINK = createHttpLink({
  uri: "http://localhost:4000/",
});
// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: "cache-and-network",
//     errorPolicy: "ignore",
//   },
//   query: {
//     fetchPolicy: "network-only",
//     errorPolicy: "all",
//   },
//   mutate: {
//     errorPolicy: "all",
//   },
// };

const client = new ApolloClient({
  link: LINK,
  cache: CACHE,
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (isLiked) => !isLiked,
          },
        });
      },
    },
  },
  // defaultOptions,
});

export default client;
