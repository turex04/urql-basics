import "../styles/globals.css";
import { Provider } from "urql";
import { client, ssrCache } from "../src/urqlClient";

function MyApp({ Component, pageProps }) {
    if (pageProps.urqlState) {
        ssrCache.restoreData(pageProps.urqlState);
    }
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
