import Head from "next/head";
import { useContext, useEffect } from "react";

import Hero from "../components/hero";
import CustomNavbar from "../components/navbar";
import About from "../components/about";
import Roadmap from "../components/roadmap";
import Team from "../components/team";
import Brush from "../components/brush";

import LoadedContext from "../hooks/loadedContext";

import { OPENSEA_URL } from "../constants";

export default function Home() {
  const loaded = useContext(LoadedContext);
  useEffect(() => {
    if (!loaded && !!window.Pace) {
      window.Pace.start();
    }
  });
  useEffect(() => {
    if (loaded && !!document.getElementsByClassName("pace")[0]) {
      const e = document.getElementsByClassName("pace")[0];
      e.className = "pace pace-inactive";
      setTimeout(() => e.remove(), 1000);
    }
  }, [loaded]);
  return (
    <div
      style={{
        position: "relative",
        zIndex: "1",
        ...(loaded ? {} : { opacity: "0" }),
      }}
    >
      <Head>
        <title>Shogun S侍murais</title>
        <meta
          name="description"
          content="8,888 Samurais sharpening their swords for battle"
        />
        <meta property="og:title" content="Shogun S侍murais" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.shogunsamurais.com" />
        <meta
          property="og:image"
          content="http://www.shogunsamurais.com/banner-preview.png?1"
        />
        <meta
          property="og:description"
          content="8,888 Samurais sharpening their swords for battle"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ShogunSamurais" />
        <link rel="icon" href="/favicon.gif" />
        <link
          rel="preload"
          href="/never_settle.otf"
          as="font"
          type="font/otf"
          crossOrigin="true"
        />
        <link rel="preload" href="/pace.min.js" as="script" />
        <script
          async
          src="/pace.min.js"
          data-pace-options='{ "ajax": false, "eventLag": false, "startOnPageLoad":false, "restartOnPushState": false}'
        />
      </Head>
      <CustomNavbar />
      <Hero sakura>
        <img
          src="/splash/title_black.svg"
          style={{
            position: "relative",
            width: "80%",
            minWidth: "300px",
            maxWidth: "900px",
            objectFit: "contain",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            className="brush-button clickable iceberg"
            href="https://discord.gg/shogunsamurais"
            target="_blank"
            rel="noreferrer"
          >
            Join us on Discord
          </a>
          <a
            className="brush-button clickable iceberg"
            href="https://twitter.com/ShogunSamurais"
            target="_blank"
            rel="noreferrer"
          >
            Follow us on Twitter
          </a>
        </div>
      </Hero>
      <About />
      <Roadmap />
      <Team />
    </div>
  );
}
