import { Discord, Twitter } from "./socials";
import { getSrcSet } from "../utils";

import styles from "../styles/Team.module.scss";

const members = [
  {
    name: "Leon",
    color: "#009CFE",
    role: "Co-founder | Project Lead",
  },
  {
    name: "Lew",
    color: "#10EF00",
    role: "Co-founder | Developer",
  },
  {
    name: "hqubes",
    color: "#FC0075",
    role: "Artist",
  },
  {
    name: "Steph",
    color: "#A000F9",
    role: "Developer",
  },
  {
    name: "Ben",
    color: "#ED0000",
    role: "Marketing",
  },
  {
    name: "YH",
    color: "#F96300",
    role: "Concept and Branding",
  },
];

function Member({ member: { imageSrc, name, color, role } }) {
  const srcSet = getSrcSet("/team/", name.toLowerCase());
  return (
    <div className={styles.member}>
      <img srcSet={srcSet} src={imageSrc} />
      <div className={styles.details}>
        <p style={{ color }}>{name}</p>
        <p>{role}</p>
      </div>
    </div>
  );
}
export default function Team() {
  return (
    <section id="team" className={styles.section}>
      <picture>
        <source
          media="(max-width: 576px)"
          srcSet="/waves-sm.png"
          className={`img-fluid ${styles.waves}`}
        />
        <source
          media="(max-width: 992px)"
          srcSet="/waves-md.png"
          className={`img-fluid ${styles.waves}`}
        />
        <img src="/waves.png" className={`img-fluid ${styles.waves}`} />
      </picture>
      <h1 style={{ textAlign: "center" }}>
        MEET THE <span className="emphasis">TEAM</span>
      </h1>
      <div className={styles.container}>
        {members.map((member, i) => (
          <Member member={member} key={i} />
        ))}
      </div>
      <div className={styles.footer}>
        <p>
          Join our discord if you have any questions, our team will always be
          there to help you
        </p>
        <div className={styles.social}>
          <Discord iconClass={styles.icon} />
          <Twitter iconClass={styles.icon} />
        </div>
      </div>
    </section>
  );
}
