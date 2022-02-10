import "../styles/globals.scss";
import LoadedContext from "../hooks/loadedContext";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.addEventListener("load", () => setLoaded(true));
  });
  return (
    <LoadedContext.Provider value={loaded}>
      <Component {...pageProps} />
    </LoadedContext.Provider>
  );
}

export default MyApp;
