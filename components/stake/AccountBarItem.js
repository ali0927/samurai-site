import styles from "../../styles/stake/AccountBarItem.module.scss";

export default function AccountBarItem({ children }) {
  return <div className={styles.accountBarItem}>{children}</div>;
}
