import styles from "../styles/Stake.module.scss";
import { useState, useMemo } from "react";

import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toasts from "../components/toasts";

import Hero from "../components/hero";
import HomeNav from "../components/homeNav";
import AccountBar from "../components/stake/AccountBar";
import SamuraiList from "../components/stake/SamuraiList";
import FamilyTabs from "../components/stake/FamilyTabs";

import {
  ActiveFamilyContext,
  BuildingFamilyContext,
  StakedFamiliesContext,
  WalletAddressContext,
  SamuraisContext,
  TokenIdsContext,
  NewFamiliesContext,
  ToastsContext,
} from "../hooks/stakeState";
import useStake from "../hooks/useStake";
import update from "immutability-helper";
import FamilyList from "../components/stake/FamilyList";

export default function Stake() {
  const [activeFamily, setActiveFamily] = useState(null);
  const [toastState, setToastState] = useState(new Map());
  const [newFamilies, setNewFamilies] = useState({});
  const [buildingFamily, setBuildingFamily] = useState([]);

  const {
    samurais,
    tokenIds,
    families,
    medallions,
    totalReward,
    claimAll,
    stakeFamilies,
    unstakeFamilies,
    chain,
    address,
    connectWallet,
  } = useStake(
    (message) => showToast({ ...message, bg: "danger" }),
    (message) => showToast({ ...message }),
    (message) => showToast({ ...message, bg: "warning" })
  );

  const isCorrectChain = useMemo(() => {
    if (chain === undefined) {
      return true;
    }
    return chain === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
  }, [chain]);

  const showToast = ({ title, ...contents }) => {
    return setToastState((toastState) =>
      update(toastState, {
        $add: [
          [
            title,
            {
              show: true,
              ...contents,
            },
          ],
        ],
      })
    );
  };

  return (
    <div className={styles.stake}>
      <Head>
        <title>Stake | Shogun S侍murais</title>
        <meta
          name="description"
          content="8,888 Samurais sharpening their swords for battle"
        />
        <meta property="og:title" content="Stake | Shogun S侍murais" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.shogunsamurais.com/stake" />
        <meta
          property="og:image"
          content="http://www.shogunsamurais.com/banner-preview.png?1"
        />
        <meta
          property="og:description"
          content="8,888 Samurais sharpening their swords for battle"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ShogunSamurais" />
        <link rel="icon" href="/favicon.gif" />
      </Head>
      <Hero style={{ position: "absolute", zIndex: "-15" }} />
      <Toasts
        toastEntries={useMemo(() => [...toastState.entries()], [toastState])}
        setToastState={setToastState}
        className={styles.toasts}
      />
      <ToastsContext.Provider value={showToast}>
        <div className={styles.content}>
          <HomeNav className={styles.navigation} />
          <ActiveFamilyContext.Provider value={activeFamily}>
            <WalletAddressContext.Provider value={address}>
              <SamuraisContext.Provider value={samurais}>
                <TokenIdsContext.Provider value={tokenIds}>
                  <BuildingFamilyContext.Provider
                    value={[buildingFamily, setBuildingFamily]}
                  >
                    <Container className={styles.staking} fluid="md">
                      {!isCorrectChain ? (
                        <Row className="card text-dark text-center">
                          You seem to be on the wrong chain. Please check your
                          Metamask/Web3 settings and ensure you are on the
                          mainnet.
                        </Row>
                      ) : (
                        <>
                          <Row>
                            <Col>
                              <AccountBar
                                connectWallet={connectWallet}
                                claimAll={claimAll}
                                medallions={medallions}
                                totalReward={totalReward}
                              />
                            </Col>
                          </Row>
                          <Row className={styles.playground}>
                            <NewFamiliesContext.Provider
                              value={[newFamilies, setNewFamilies]}
                            >
                              <Col lg={4} className={styles.playgroundCol}>
                                <SamuraiList />
                              </Col>
                              <Col lg={8} className={styles.playgroundCol}>
                                <StakedFamiliesContext.Provider
                                  value={families}
                                >
                                  <FamilyTabs />
                                  <FamilyList
                                    changeActiveFamily={setActiveFamily}
                                    stakeFamilies={stakeFamilies}
                                    unstakeFamilies={unstakeFamilies}
                                  />
                                </StakedFamiliesContext.Provider>
                              </Col>
                            </NewFamiliesContext.Provider>
                          </Row>
                        </>
                      )}
                    </Container>
                  </BuildingFamilyContext.Provider>
                </TokenIdsContext.Provider>
              </SamuraisContext.Provider>
            </WalletAddressContext.Provider>
          </ActiveFamilyContext.Provider>
        </div>
      </ToastsContext.Provider>
    </div>
  );
}
