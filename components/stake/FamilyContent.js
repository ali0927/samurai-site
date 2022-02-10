import styles from "../../styles/stake/FamilyContent.module.scss";

import SamuraiCard from "./SamuraiCard";

const getFamilyBonus = (guildMultiplier) => {
  const num = guildMultiplier.toNumber();
  return (num - 10000) / 100;
};

const getNormalBonus = (multiplier) => {
  const num = multiplier.toNumber();
  return num / 100;
};

export default function FamilyContent({
  family: { samurais, guildMultiplier, medallionMultiplier, shogunBonus },
}) {
  return (
    <div className={styles.familyContent}>
      <div className={styles.samuraiCards}>
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
        <div className={styles.bonuses}>
          <div>
            <span className={styles.field}>Family Bonus:&nbsp;</span>
            {getFamilyBonus(guildMultiplier)}%
          </div>
          <div>
            <span className={styles.field}>Medallion Bonus:&nbsp;</span>
            {getNormalBonus(medallionMultiplier)}%
          </div>
          <div>
            <span className={styles.field}>Shogun Bonus:&nbsp;</span>
            {getNormalBonus(shogunBonus)}%
          </div>
        </div>
      </div>
    </div>
  );
}
