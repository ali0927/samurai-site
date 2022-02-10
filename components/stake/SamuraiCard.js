import styles from "../../styles/stake/SamuraiCard.module.scss";

import { useContext } from "react";
import { BuildingFamilyContext } from "../../hooks/stakeState";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export default function SamuraiCard({
  placeholder,
  samurai,
  addSamurai,
  isRemovable,
  index,
}) {
  const [buildingFamily, setBuildingFamily] = useContext(BuildingFamilyContext);

  const removeSamurai = (index) => {
    setBuildingFamily((prevAddedSamurais) => {
      const newAddedSamuraisArray = [...prevAddedSamurais];
      newAddedSamuraisArray.splice(index, 1);
      return newAddedSamuraisArray;
    });
  };

  if (placeholder || addSamurai) {
    return (
      <Card className={styles.placeholder}>
        {addSamurai && "Add Samurai to Family"}
      </Card>
    );
  }

  return (
    <Card className={styles.samuraiCard}>
      <Image src={samurai.image} />
      <Card.Footer className={styles.details}>
        {samurai.name}
        {isRemovable && (
          <div
            className={styles.remove}
            onClick={() => {
              removeSamurai(index);
            }}
          >
            X
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}
