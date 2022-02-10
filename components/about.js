import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/About.module.scss";
import Carousel from "./carousel";

const clans = [
  {
    title: "Gi",
    subtitle: "Shogun of Justice",
    description: "Samurais make a full commitment to their decisions.",
    imgName: "clan_justice.png",
  },
  {
    title: "Yu",
    subtitle: "Shogun of Courage",
    description: "Heroic courage is not blind, it is intelligent and strong.",
    imgName: "clan_courage.png",
  },
  {
    title: "Jin",
    subtitle: "Shogun of Compassion",
    description: "Samurais develop a power that can and must be used for good.",
    imgName: "clan_compassion.png",
  },
  {
    title: "Rei",
    subtitle: "Shogun of Respect",
    description: "Samurais have no reason to be cruel.",
    imgName: "clan_respect.png",
  },
  {
    title: "Makoto",
    subtitle: "Shogun of Integrity",
    description:
      "To speak is to do.  Samurais do not have to  give their word.",
    imgName: "clan_integrity.png",
  },
  {
    title: "Meiyo",
    subtitle: "Shogun of Honor",
    description: "A Samurai’s action is a reflection of their worth. ",
    imgName: "clan_honor.png",
  },
  {
    title: "Chūgi",
    subtitle: "Shogun of Duty",
    description:
      "To everyone that they are responsible for, Samurais remain fiercely true.",
    imgName: "clan_duty.png",
  },
  {
    title: "Jisei",
    subtitle: "Shogun of Restraint",
    description:
      "For a Samurais to conquer himself is the first and noblest of all victories.",
    imgName: "clan_restraint.png",
  },
];

export default function About() {
  return (
    <section id="about" className="text-center overflow-hidden">
      <section id="bushido" className={styles.bushido}>
        <Container fluid="md">
          <Row style={{ padding: "0 2rem" }}>
            <Col lg={8} className={styles.exposition}>
              <h2>The 8 Bushido Codes</h2>
              Bushidō (<nobr>武士道</nobr>, &quot;The way of the warrior&quot;)
              is a moral code relating to 侍 (Samurai) attitudes, behaviour and
              lifestyle, where all Samurais live and die by. <br />
              <br />
              These 8 virtues of the Bushido code are each embodied by the 8
              legendary Shoguns (将軍, shōgun):
            </Col>
            <Col lg={4} sm={0}></Col>
          </Row>
        </Container>
        <img
          src="/splatter-top.png"
          className={`${styles.splatter} ${styles.top}`}
          style={{ maxWidth: "40%", top: "0px" }}
        />
        <Container fluid="md">
          <Row>
            {clans.map(({ title, subtitle, description, imgName }) => (
              <Col
                lg={3}
                md={6}
                sm={6}
                xs={6}
                className={styles.clan}
                key={title}
              >
                <div>
                  <img
                    src={`/clans/white/${imgName}`}
                    className={styles.white}
                  />
                  <img src={`/clans/red/${imgName}`} className={styles.red} />
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>&quot;{subtitle}&quot;</div>
                <div className={styles.description}>{description}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section id="who-are">
        <div className={`bg-paper`} style={{ position: "relative" }}>
          <img
            src="/splatter-bottom.png"
            className={styles.splatter}
            style={{ left: "0px", top: "0px" }}
          />
          <Container fluid="md" style={{padding: "0 4rem"}}>
            <Row>
              <Col md={3} sm={0}></Col>
              <Col md={9} sm={12} className={styles.exposition}>
                <h2 style={{ textAlign: "start", padding: "2rem 0" }}>
                  WHO ARE THE
                  <img
                    style={{ height: "1.2em", marginTop: "-0.15em" }}
                    src="/splash/title_black.png"
                  />
                </h2>
                <div>
                  SHOGUN <nobr>S侍MURAIS</nobr> is a collection of 8,888
                  randomly generated NFT Samurais living on the Ethereum
                  Blockchain.
                  <br />
                  <br /> Each of them has sworn an oath to one of the 8
                  Legendary Shoguns, personifying the virtue of the Shogun and
                  dedicating themselves to a lifelong service to the Bushido
                  code.
                  <br />
                  <br /> Each <nobr>S侍MURAI</nobr> is unique and is created
                  from over 100 hand-drawn traits.
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <Carousel />
    </section>
  );
}
