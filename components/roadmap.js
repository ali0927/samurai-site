import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import BrushDown from "./brush_down.js";
import styles from "../styles/Roadmap.module.scss";

const roadmapItems = [
  {
    title: "Appreciation",
    progress: "25% Sold",
    description:
      "8 Shogun S侍murais NFTs will be airdropped randomly to early adopters and supporters. This is to show appreciation for the OGs that have supported our project from Day 1 ありがとう!",
  },
  {
    title: "Outreach",
    progress: "50% Sold",
    description:
      "We will plan and collate orders for exclusive merchandise that contain the Shogun S侍murais brand starting with T-shirts and Hoodies, you can even send us your minted S侍murais to be printed! Additionally, we will be looking for potential vendors that can produce novel merchandise such as brand-engraved miniature katanas, brand-engraved straw hats and Kimonos. These will all only be available to Shogun S侍murais NFT holders.",
  },
  {
    title: "Community",
    progress: "75% Sold",
    description:
      "$50,000 and 1% of royalties from secondary market will be reserved for community development. These funds will go back to the Shogun S侍murais community to facilitate the building and creation of further initiatives aimed at the outreach to spread the word and introduce more individuals into our tight-knitted community. This will include all marketing initiatives and potentially even a season 2 collection.",
  },
  {
    title: "Stability",
    progress: "100% Sold",
    description:
      "A buy-back wallet will be used to help stabilise the price of Shogun S侍murais. We do so by buying back ALL Shogun S侍murais NFT listed below the mint price every 7 days from OpenSea. The NFTs that we buy back will then be used for future promotions and giveaways.",
  },
];

const WithLinebreaks = ({ description }) => {
  const paragraphs = description.split("\n");
  return (
    <Fragment>
      {paragraphs.map((paragraph, i) => {
        return (
          <Fragment key={i}>
            {paragraph}
            {i === paragraphs.length - 1 ? (
              ""
            ) : (
              <>
                <br />
                <br />
              </>
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-paper">
      <Container fluid="lg" style={{ padding: "2rem 0" }}>
        <Row>
          <Col xs={2} sm={2}>
            <BrushDown className={styles.brush} preserveAspectRatio="none" fill="#CD181B"/>
          </Col>
          <Col xs={10} sm={10}>
            <div className={styles.container}>
              <h1>
                ROAD TO <span className="emphasis">GLORY</span>
              </h1>
              {roadmapItems.map(({ title, progress, description }) => (
                <div className={styles.item} key={title}>
                  <span className={styles.heading}>
                    <h1>
                      {title}{" "}
                      <span className={styles.progress}>{progress}</span>
                    </h1>
                  </span>
                  <div>
                    <WithLinebreaks description={description} />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <picture>
        <source
          media="(max-width: 576px)"
          srcSet="/waves-sm.png"
          className="img-fluid"
        />
        <source
          media="(max-width: 992px)"
          srcSet="/waves-md.png"
          className="img-fluid"
        />
        <img src="/waves.png" className="img-fluid" />
      </picture>
    </section>
  );
}
