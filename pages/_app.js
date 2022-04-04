import "../styles/globals.scss";
import LoadedContext from "../hooks/loadedContext";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const apolloClient = new ApolloClient({
  uri: `${serverUrl}/api/graphql`,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.addEventListener("load", () => setLoaded(true));
  });

  return (
    <ApolloProvider client={apolloClient}>
      <LoadedContext.Provider value={loaded}>
        <Component {...pageProps} />
      </LoadedContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
