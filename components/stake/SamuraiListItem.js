import styles from "../../styles/stake/SamuraiListItem.module.scss";

import { useContext } from "react";
import {
  ActiveFamilyContext,
  BuildingFamilyContext,
  ToastsContext,
  NEW_FAMILY_KEY,
} from "../../hooks/stakeState";

import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { getSamuraiAttribute } from "../../utils";

export default function SamuraiListItem({ samurai }) {
  const { tokenId, name, image } = samurai;
  const guild = getSamuraiAttribute(samurai, "guild");
  const guildColor = getSamuraiAttribute(samurai, "bg");

  const activeFamily = useContext(ActiveFamilyContext);
  const [buildingFamily, setBuildingFamily] = useContext(BuildingFamilyContext);
  const showToast = useContext(ToastsContext);

  const addSamurai = (samurai) => {
    if (buildingFamily.length >= 3) {
      showToast({
        title: "Too Many Samurais in Family",
        message: "Maximum 3 samurais in a family",
        bg: "danger",
      });
      return;
    }

    setBuildingFamily((prevAddedSamurais) => {
      const newAddedSamuraisArray = [...prevAddedSamurais];
      newAddedSamuraisArray.push(samurai);
      return newAddedSamuraisArray;
    });
  };

  return (
    <ListGroup.Item>
      <div className={styles.header}>
        <div className={styles.image}>
          <Image fluid roundedCircle src={image} className={styles.samurai} />
        </div>
        <div className={styles.details}>
          <div className={styles.samuraiNumber}>{name}</div>
          <div className={styles.guild}>
            <Badge className={styles.guildBadge} bg="light" pill>
              {guild}
            </Badge>
          </div>
        </div>
        {activeFamily === NEW_FAMILY_KEY && (
          <Button
            variant="dark"
            className={styles.button}
            onClick={() => {
              addSamurai(samurai);
            }}
          >
            +
          </Button>
        )}
      </div>
    </ListGroup.Item>
  );
}
