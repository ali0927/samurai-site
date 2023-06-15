import styles from "../../styles/stake/SamuraiList.module.scss";
import { useContext, useState, useMemo } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { 
  Card, 
  ListGroup, 
  Dropdown, 
  Button
} from "react-bootstrap";

import BurnSamuraiListItem from "./BurnSamuraiListItem";
import Tiers from "../../lib/Tiers.json";
import {
  SamuraisContext,
} from "../../hooks/stakeState";

export default function BurnSamuraiList({ 
  selectedSamurais, 
  selectSamurai, 
  deSelectSamurai,
  burnSamurais
}) {
  const { mutate } = useApolloClient();
  const samurais = useContext(SamuraisContext);
  const selectedIdx = selectedSamurais.reduce((total, samurai) => {
    if (total[samurai.tokenId]) return total;
    else {
      total[samurai.tokenId] = true;
      return total
    }
  }, {});

  const tiers = useMemo(() => {
    const res_tiers = selectedSamurais.reduce((total, sam) => {
      const sam_tier = Tiers.find((tier) => tier.id === sam.tokenId);
      total[parseInt(sam_tier.tier)]++;
      return total;
    }, new Array(5).fill(0));
    console.log('tiers: ', res_tiers);
    return res_tiers;
  }, [selectedSamurais]);

  const totalTier = useMemo(() => {
    const _tiers = [...tiers];
    _tiers.shift();
    return _tiers.reduce((total, tier, idx) => 
      total + tier * (idx + 1)
    );
  }, [tiers]);

  const mintsAvailable = useMemo(() => {
    let res = 0;
    res = tiers[1] + tiers[2];
    res += Math.floor(tiers[3] / 2);
    res += Math.floor(tiers[4] / 3);
    res += tiers[3] % 2 + tiers[4] % 3 === 3 ? 1: 0;
    return res;
  }, [tiers]);

  const burn = async () => {
    await burnSamurais(selectedSamurais.map(s => s.tokenId));
  }

  return (
    <Card className={styles.burnSamurais}>
      <Card.Header className={styles.header}>
        <Card.Subtitle className={styles.subtitle}>
          Burn your Samurais to be eligible for claiming the mint of new collection.
          <br />
          The amount of mints you will receive by burning depends on the rank of your Samurais.
        </Card.Subtitle>
      </Card.Header>
      <div
        className={`${styles.body} ${samurais.length === 0 ? styles.noSamurais : ""
          }`}
      >
        {samurais.length > 0 ? (
          <ListGroup variant="flush" className={styles.list}>
            {samurais.map(samurai =>
              <BurnSamuraiListItem
                key={samurai.tokenId}
                samurai={samurai} 
                selected={selectedIdx[samurai.tokenId]}
                select={selectSamurai}
                deSelect={deSelectSamurai}
              />
            )}
          </ListGroup>
        ) : (
          <span>
            {samurais.length === 0
              ? "No samurais to show"
              : "all samurais in families"}
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <div>
          <label>Total Samurais Selected: &nbsp;</label>
          <label className={styles.selectedValue}>{selectedSamurais.length}</label>
        </div>
        <div>
          <label>Total Tier Score: &nbsp;</label>
          <label className={styles.selectedValue}>{totalTier} Points</label>
        </div>
        <div>
          <label>Total Mints Available: &nbsp;</label>
          <label className={styles.selectedValue}>{mintsAvailable}</label>
        </div>
        <Button variant={"danger"} className={styles.submit} onClick={burn}>
          Burn
        </Button>
      </div>
    </Card>
  );
}
