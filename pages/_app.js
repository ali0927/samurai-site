import "../styles/globals.scss";
import LoadedContext from "../hooks/loadedContext";
import { useState, useEffect } from "react";
import axios from "axios";
import getConfig from 'next/config';
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
    callAPI();
  });

  // Only holds serverRuntimeConfig and publicRuntimeConfig
  // const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  // Will only be available on the server-side
  // console.log('ADMIN_PRIVATEKEY-------', serverRuntimeConfig.ADMIN_PRIVATEKEY);
  // Will be available on both server-side and client-side
  // console.log('staticFolder-----', publicRuntimeConfig.staticFolder);

  function callAPI() {
    axios({
      'method': 'POST',
      'url': '/api/graphql',
      'data': {
        'query': `
          query Query{
            test
          }
        `
      }
    }).then((_res) => {
        console.log(JSON.stringify(_res.data.data))
    }).catch((e) => console.log(e))
  }

  return (
    <ApolloProvider client={apolloClient}>
      <LoadedContext.Provider value={loaded}>
        <Component {...pageProps} />
      </LoadedContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
