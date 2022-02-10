import styles from "../../styles/stake/FamilyContent.module.scss";
import { useContext } from "react";

import update from "immutability-helper";

import Button from "react-bootstrap/Button";
import {
  ActiveFamilyContext,
  NewFamiliesContext,
} from "../../hooks/stakeState";

import SamuraiCard from "./SamuraiCard";

export default function NonStakedFamily({ eventKey, title, samurais }) {
  const [newFamilies, setNewFamilies] = useContext(NewFamiliesContext);
  const activeFamily = useContext(ActiveFamilyContext);

  const deleteFamilyFromNewFamilies = () => {
    setNewFamilies((prevFamilies) => {
      const updatedFamilies = update(prevFamilies, { $unset: [activeFamily] });
      return updatedFamilies;
    });
  };

  return (
    <div className={styles.familyContent}>
      <div className={styles.samuraiCards}>
        {" "}
        {samurais &&
          samurais.map((samurai) => {
            return <SamuraiCard key={samurai.name} samurai={samurai} />;
          })}
        {samurais &&
          samurais.length < 3 &&
          Array.from(Array(3 - samurais.length).keys()).map((i) => {
            return <SamuraiCard key={`placeholder_${i}`} placeholder />;
          })}
      </div>
      <div className={styles.action}>
        <Button
          variant="dark"
          onClick={() => {
            deleteFamilyFromNewFamilies();
          }}
        >
          Delete Family
        </Button>
      </div>
    </div>
  );
}
