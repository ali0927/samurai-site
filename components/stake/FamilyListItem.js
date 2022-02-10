import styles from "../../styles/stake/FamilyListItem.module.scss";
import update from "immutability-helper";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function FamilyListItem({
  familyId,
  family,
  onView,
  isSelected,
  setSelectedFamilyIds,
}) {
  const addToSelected = (familyId) => {
    setSelectedFamilyIds((prevSelectedFamilyIds) => {
      const newSelected = update(prevSelectedFamilyIds, { $add: [familyId] });
      return newSelected;
    });
  };

  const removeFromSelected = (familyId) => {
    setSelectedFamilyIds((prevSelectedFamilyIds) => {
      const newSelected = update(prevSelectedFamilyIds, {
        $remove: [familyId],
      });
      return newSelected;
    });
  };

  const samuraiIds = family?.samurais?.map(({tokenId}) => tokenId)?.join(', ')
  const displayName = samuraiIds ? `Samurai: ${samuraiIds}` : `${familyId}`

  return (
    <ListGroup.Item className={styles.familyListItem}>
      {displayName}
      <div className={styles.actionCorner}>
        <Button onClick={onView} variant="dark">
          View
        </Button>
        &nbsp; &nbsp;
        <div
          className={`${styles.checkbox} ${isSelected ? styles.selected : ""}`}
          onClick={() => {
            if (isSelected) {
              removeFromSelected(familyId);
            } else {
              addToSelected(familyId);
            }
          }}
        />
      </div>
    </ListGroup.Item>
  );
}
