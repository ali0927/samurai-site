import styles from "../../styles/stake/FamilyTabs.module.scss";

import { useContext, useMemo } from "react";
import {
  ActiveFamilyContext,
  StakedFamiliesContext,
  NEW_FAMILY_KEY,
  NewFamiliesContext,
} from "../../hooks/stakeState";

import Card from "react-bootstrap/Card";

import FamilyContent from "./FamilyContent";
import NonStakedFamily from "./NonStakedFamily";
import NewFamily from "./NewFamily";

const SAMPLE_SAMURAI = {
  name: "#8888",
  description:
    "An honorable Samurai willing to dedicate his life to the Bushido Code.",
  image: "ipfs://bafybeia53ibyprzkxdly64wsmty7ytscpc7exswqiycz2ygyh3qfco6pvi",
  attributes: [
    {
      trait_type: "class",
      value: "Samurai",
    },
    {
      trait_type: "guild",
      value: "Integrity",
    },
  ],
};

const NOT_STAKED = "notStaked";
const STAKED = "staked";

export default function FamilyTabs() {
  const activeFamily = useContext(ActiveFamilyContext);
  const stakedFamilies = useContext(StakedFamiliesContext);
  const [newFamilies, _] = useContext(NewFamiliesContext);

  const familyType = useMemo(() => {
    if (activeFamily === NEW_FAMILY_KEY) {
      return NEW_FAMILY_KEY;
    }
    if (stakedFamilies.hasOwnProperty(activeFamily)) {
      return STAKED;
    }
    if (newFamilies.hasOwnProperty(activeFamily)) {
      return NOT_STAKED;
    }
  }, [activeFamily, stakedFamilies, newFamilies]);

  return (
    <Card className={styles.familyTabGroup}>
      {familyType === NEW_FAMILY_KEY && <NewFamily />}
      {familyType === NOT_STAKED && (
        <NonStakedFamily samurais={newFamilies[activeFamily]} />
      )}
      {familyType === STAKED && (
        <FamilyContent family={stakedFamilies[activeFamily]} />
      )}
    </Card>
  );
}
