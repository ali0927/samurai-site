import { Toast, ToastContainer, ToastBody, ToastHeader } from "react-bootstrap";
import update from "immutability-helper";
import styles from "../styles/Toasts.module.scss";
const Toasts = ({ toastEntries, setToastState, className }) => (
  <ToastContainer className={`${styles.toastContainer} ${className}`}>
    {toastEntries.map(([k, { message, bg, links = [] }]) => (
      <Toast
        key={k}
        autohide
        delay={10000}
        onClose={() =>
          setToastState((toastState) => update(toastState, { $remove: [k] }))
        }
        bg={bg}
        show={true}
      >
        <ToastHeader
          className={`${styles.toast_header}`}
          style={{ fontSize: "1rem", fontStyle: "normal" }}
        >
          {k}
        </ToastHeader>
        <ToastBody
          style={{
            fontSize: "0.75rem",
            fontStyle: "normal",
            ...(!!bg ? {} : { color: "black" }),
          }}
        >
          <>
            <div>{message}</div>
            {links.map((href) => (
              <div key={href}>
                <a href={href} target="_blank" rel="noreferrer">
                  {href.slice(0, 35)}...
                </a>
              </div>
            ))}
          </>
        </ToastBody>
      </Toast>
    ))}
  </ToastContainer>
);

export default Toasts;
