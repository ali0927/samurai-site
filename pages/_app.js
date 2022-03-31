import "../styles/globals.scss";
import LoadedContext from "../hooks/loadedContext";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
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
