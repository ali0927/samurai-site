import "../styles/globals.scss";
import LoadedContext from "../hooks/loadedContext";
import { useState, useEffect } from "react";
import axios from "axios";


function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.addEventListener("load", () => setLoaded(true));
    callAPI();
  });


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
    <LoadedContext.Provider value={loaded}>
      <Component {...pageProps} />
    </LoadedContext.Provider>
  );
}

export default MyApp;
