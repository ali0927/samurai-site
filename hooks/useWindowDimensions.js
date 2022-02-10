import { useState, useEffect } from "react";

function getWindowDimensions(window) {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState();

  useEffect(() => {
    setWindowDimensions(getWindowDimensions(window));
    function handleResize() {
      setWindowDimensions(getWindowDimensions(window));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
