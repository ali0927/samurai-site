import styles from "../../styles/stake/FamilyContent.module.scss";

import { useContext } from "react";
import {
  BuildingFamilyContext,
  getNewFamilyId,
  NewFamiliesContext,
  ToastsContext,
} from "../../hooks/stakeState";

import Button from "react-bootstrap/Button";

import SamuraiCard from "./SamuraiCard";

export default function NewFamily() {
  const [buildingFamily, setBuildingFamily] = useContext(BuildingFamilyContext);
  const [newFamilies, setNewFamilies] = useContext(NewFamiliesContext);
  const showToast = useContext(ToastsContext);

  const addNewFamily = (family) => {
    if (family.length < 1) {
      showToast({
        title: "No Samurais",
        message: "Add at least 1 samurai to the family",
        bg: "danger",
      });
      return;
    }

    const familyId = getNewFamilyId();
    setNewFamilies((prevFamilies) => {
      return {
        ...prevFamilies,
        [familyId]: family,
      };
    });
  };

  return (
    <div className={styles.familyContent}>
      <div className={styles.samuraiCards}>
        {buildingFamily.map((samurai, index) => {
          return (
            <SamuraiCard
              key={samurai.name}
              samurai={samurai}
              index={index}
              isRemovable
            />
          );
        })}
        {buildingFamily.length < 3 &&
          Array.from(Array(3 - buildingFamily.length).keys()).map((i) => {
            return <SamuraiCard key={`add_samurai_${i}`} addSamurai />;
          })}
      </div>
      <div className={styles.action}>
        <Button
          onClick={() => {
            addNewFamily(buildingFamily);
            setBuildingFamily([]);
          }}
          variant="dark"
        >
          Create Family
        </Button>
      </div>
    </div>
  );
}
