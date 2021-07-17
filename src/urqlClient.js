import {
    createClient,
    ssrExchange,
    dedupExchange,
    cacheExchange,
    fetchExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({
    isClient: !isServerSide,
    initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
});

const client = createClient({
    url: "https://graphql-weather-api.herokuapp.com",
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    fetchOptions: () => ({
        headers: {},
    }),
});

export { client, ssrCache };
