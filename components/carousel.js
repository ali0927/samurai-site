import styles from "../styles/Carousel.module.css";
import { getSrcSet } from "../utils";

export default function Carousel() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div className={styles.container}>
        {Array.from({ length: 8 }, (v, i) => {
          const srcSet = getSrcSet('/samurai/', i + 1);
          const fallback = srcSet[4];
          return (
            <div className={styles.card} key={i}>
              <img srcSet={srcSet} src={fallback} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
