import styles from "../styles/ProgressShiba.module.scss";
export default function ProgressShiba({ progress = 10 }) {
  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ backgroundColor: "grey" }} />
      <div
        className={styles.bar}
        style={{ backgroundColor: "#fd0211", width: `${progress}%` }}
      />
      <img
        src="/shiba.png"
        className={styles.shiba}
        style={{ left: `${progress}%` }}
      />
    </div>
  );
}
