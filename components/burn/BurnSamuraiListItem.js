import React, { useMemo } from "react";
import {
  ActiveFamilyContext,
  BuildingFamilyContext,
  NEW_FAMILY_KEY,
  ToastsContext,
} from "../../hooks/stakeState";
import Tiers from "../../lib/Tiers.json";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { getSamuraiAttribute } from "../../utils";
import styles from "../../styles/stake/SamuraiListItem.module.scss";
import { useContext } from "react";

export default function BurnSamuraiListItem({ 
  samurai, 
  selected, 
  select,
  deSelect
}) {
  const { tokenId, name, image } = samurai;
  const imageUrl = image.replace(
    "https://shogunsamurais.com/cdn-cgi/image/width=500,quality=100/",
    ""
  );
  // console.log("🚀 | SamuraiListItem | samurai", samurai);

  const tier = Tiers.find((val) => val.id === tokenId);

  return (
    <ListGroup.Item className={styles.burnSamuraiListItem}>
      <div className={styles.header}>
        <div className={styles.image}>
          <Image fluid src={imageUrl} className={styles.samurai} />
        </div>
        <div className={styles.details}>
          <div className={styles.samuraiNumber}>
            <label>{name}</label>
            <label className={styles.rarity}>Rank:</label>
            <label className={styles.rarity}>{`${tier.rank} / 7270`}</label>
          </div>
          <div className={styles.samuraiTier}>
            <div>
              <label className={styles.tierTitle}>Tier:&nbsp;</label>
              <label className={styles.tierValue}>{tier.tier}</label>
            </div>
            <Button 
              variant={selected ? "secondary": "danger"} 
              onClick={() => selected ? deSelect(samurai): select(samurai)}   
            >
              {selected ? "Deselect": "Select"}
            </Button>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}
