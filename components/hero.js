import React, { useEffect, useRef, useContext } from "react";
import LoadedContext from "../hooks/loadedContext";
const SakuraCanvas = require("../vendor/sakura-canvas/src/sakura-canvas");

import styles from "../styles/Hero.module.scss";

const heroSamurai = [
  [["A1", "A2"], "B"],
  [["D1", "D2"], "C"],
];

function getSrcSet(id) {
  const srcset = [692, 1385, 2077, 2769]
    .map((width, i) => `/splash/${id}-${i + 1}x.png ${width}w`)
    .join(", ");
  return srcset;
}

export default function Hero({ style, sakura = false, children }) {
  const loaded = useContext(LoadedContext);
  const canvasEl = useRef(null);
  useEffect(() => {
    if (!sakura) {
      return;
    }
    const [canvasHeight, canvasWidth] = [
      canvasEl.current.clientHeight,
      canvasEl.current.clientWidth,
    ];
    const area = canvasHeight * canvasWidth;
    const scale = area / 1080 / 1920;
    const sakuraCanvas = new SakuraCanvas({
      shadowBlur: 0,
      maxChips: 600 * scale,
      maxDepth: 100,
      baseSize: 2,
      baseSpeedY: 0.2,
      baseSpeedX: 0.2,
    });
    sakuraCanvas.initWithElement(canvasEl.current);
    sakuraCanvas.animate();
  });

  return (
    <div id="hero" className={styles.hero} style={style}>
      <div className={styles.container}>{children}</div>
      {sakura ? <canvas ref={canvasEl} /> : <></>}
      <div className={styles.samurai}>
        {heroSamurai.map(([[outer_first, outer_second], inner], i) => (
          <div
            className={`${styles.samurai_half_container} ${
              i === 1 ? styles.container_right : styles.container_left
            }`}
            key={i}
          >
            <div style={{ position: "relative" }} className={styles.outer_img}>
              <img
                srcSet={getSrcSet(outer_first)}
                src={`/splash/${outer_first}-4x.png`}
                className={styles.outer_img}
                style={{ position: "absolute", opacity: loaded ? "0" : "1" }}
              />
              <img
                srcSet={getSrcSet(outer_second)}
                src={`/splash/${outer_second}-4x.png`}
                className={styles.outer_img}
                style={{ opacity: !loaded ? "0" : "1" }}
              />
            </div>
            <img
              srcSet={getSrcSet(inner)}
              src={`/splash/${inner}-4x.png`}
              className={
                !loaded
                  ? `${styles.inner_img} + ${styles.loading}`
                  : styles.inner_img
              }
            />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        <img src="/splash/branches.png" className={styles.branch} />
      </div>
    </div>
  );
}
