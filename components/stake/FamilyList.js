import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import update from "immutability-helper";

import styles from "../../styles/stake/FamilyList.module.scss";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import FamilyListItem from "./FamilyListItem";
import {
  NewFamiliesContext,
  NEW_FAMILY_KEY,
  StakedFamiliesContext,
} from "../../hooks/stakeState";

export default function FamilyList({
  changeActiveFamily,
  stakeFamilies,
  unstakeFamilies,
}) {
  const stakedFamilies = useContext(StakedFamiliesContext);
  const [newFamilies, setNewFamilies] = useContext(NewFamiliesContext);
  const [selectedFamilyIds, setSelectedFamilyIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState("unstaked");

  const clearSelection = useCallback(() => {
    setSelectedFamilyIds(new Set());
  }, [setSelectedFamilyIds]);

  useEffect(() => {
    clearSelection();
  }, [activeTab, clearSelection]);

  const deleteFamilyFromNewFamilies = (family) => {
    setNewFamilies((prevFamilies) => {
      const updatedFamilies = update(prevFamilies, { $unset: [family] });
      return updatedFamilies;
    });
  };

  return (
    <Card className={styles.families}>
      <Card.Header className={styles.header}>
        Families{" "}
        <div className={styles.paneButtons}>
          <Button
            onClick={() => {
              changeActiveFamily(NEW_FAMILY_KEY);
            }}
            variant="dark"
          >
            New Family +
          </Button>
          {activeTab === "unstaked" && selectedFamilyIds.size > 0 && (
            <Button
              onClick={() => {
                const familiesToStake = Array.from(selectedFamilyIds).reduce(
                  (collector, familyId) => {
                    const samurais = newFamilies[familyId];
                    collector.push(
                      samurais.map((samurai) => {
                        return samurai.tokenId;
                      })
                    );
                    return collector;
                  },
                  []
                );

                stakeFamilies(familiesToStake).then(() => {
                  selectedFamilyIds.forEach((family) => {
                    deleteFamilyFromNewFamilies(family);
                  });
                  clearSelection();
                });
              }}
              variant="danger"
            >
              Stake
            </Button>
          )}
          {activeTab === "staked" && selectedFamilyIds.size > 0 && (
            <Button
              onClick={() => {
                const familiesToUnstake = Array.from(selectedFamilyIds);
                unstakeFamilies(familiesToUnstake).then((_) =>
                  clearSelection()
                );
              }}
              variant="danger"
            >
              Unstake
            </Button>
          )}
        </div>
      </Card.Header>
      <Tab.Container defaultActiveKey="unstaked">
        <Container className={styles.container}>
          <Row className={styles.row}>
            <Col sm={3} className={styles.tabs}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="unstaked"
                    onClick={() => {
                      setActiveTab("unstaked");
                    }}
                  >
                    New
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="staked"
                    onClick={() => {
                      setActiveTab("staked");
                    }}
                  >
                    Staked
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className={styles.tabContent}>
              <Tab.Content>
                <Tab.Pane eventKey="unstaked">
                  <ListGroup variant="flush" className={styles.list}>
                    {Object.entries(newFamilies).map(([familyId, family]) => {
                      return (
                        <FamilyListItem
                          familyId={familyId}
                          key={familyId}
                          onView={() => {
                            changeActiveFamily(familyId);
                          }}
                          isSelected={selectedFamilyIds.has(familyId)}
                          setSelectedFamilyIds={setSelectedFamilyIds}
                        />
                      );
                    })}
                  </ListGroup>
                </Tab.Pane>
                <Tab.Pane eventKey="staked">
                  <ListGroup variant="flush" className={styles.list}>
                    {Object.entries(stakedFamilies).map(
                      ([familyId, family]) => {
                        return (
                          <FamilyListItem
                            familyId={familyId}
                            family={family}
                            key={familyId}
                            onView={() => {
                              changeActiveFamily(familyId);
                            }}
                            isSelected={selectedFamilyIds.has(familyId)}
                            setSelectedFamilyIds={setSelectedFamilyIds}
                          />
                        );
                      }
                    )}
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </Card>
  );
}
