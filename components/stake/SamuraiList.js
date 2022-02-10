import styles from "../../styles/stake/SamuraiList.module.scss";
import { useContext, useState, useMemo } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";

import SamuraiListItem from "./SamuraiListItem";

import {
  BuildingFamilyContext,
  NewFamiliesContext,
  SamuraisContext,
} from "../../hooks/stakeState";

const GUILDS = [
  "Integrity",
  "Justice",
  "Courage",
  "Compassion",
  "Respect",
  "Honour",
  "Duty",
  "Restraint",
];

import { getSamuraiAttribute } from "../../utils";

export default function SamuraiList() {
  const samurais = useContext(SamuraisContext);
  const [newFamilies, _setNewFamilies] = useContext(NewFamiliesContext);
  const [buildingFamily, _setBuildingFamily] = useContext(
    BuildingFamilyContext
  );

  const [filter, setFilter] = useState(null);

  const relevantSamurais = useMemo(() => {
    const newFamilySamuraiIds = Object.values(newFamilies).reduce(
      (collector, samurais) => {
        collector.push(
          ...samurais.map((samurai) => {
            return samurai.tokenId;
          })
        );
        return collector;
      },
      []
    );

    const buildingFamilySamuraiIds = buildingFamily.map(
      (samurai) => samurai.tokenId
    );

    const forbiddenSet = new Set([
      ...newFamilySamuraiIds,
      ...buildingFamilySamuraiIds,
    ]);

    return samurais.filter((samurai) => {
      return !forbiddenSet.has(samurai.tokenId);
    });
  }, [samurais, newFamilies, buildingFamily]);

  return (
    <Card className={styles.samurais}>
      <Card.Header className={styles.header}>
        <div>Samurais</div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" as="div">
            <span className="bi bi-filter-right" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setFilter(null);
              }}
            >
              Reset Filters
            </Dropdown.Item>
            {GUILDS.map((guild) => {
              return (
                <Dropdown.Item
                  key={guild}
                  onClick={() => {
                    setFilter(guild);
                  }}
                >
                  {guild}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <div
        className={`${styles.body} ${
          relevantSamurais.length === 0 ? styles.noSamurais : ""
        }`}
      >
        {relevantSamurais.length > 0 ? (
          <ListGroup variant="flush" className={styles.list}>
            {relevantSamurais
              .filter((samurai) => {
                if (!filter) {
                  return true;
                }
                return getSamuraiAttribute(samurai, "guild") === filter;
              })
              .map((samurai) => {
                return <SamuraiListItem samurai={samurai} key={samurai.name} />;
              })}
          </ListGroup>
        ) : (
          <span>
            {samurais.length === 0
              ? "No samurais to show"
              : "all samurais in families"}
          </span>
        )}
      </div>
    </Card>
  );
}
