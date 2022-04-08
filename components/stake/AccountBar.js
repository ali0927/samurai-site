import React, { useState } from "react";
import styles from "../../styles/stake/AccountBar.module.scss";
import { useContext } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

import AccountBarItem from "./AccountBarItem";

import { getDisplayAddress } from "../../utils";
import { WalletAddressContext } from "../../hooks/stakeState";

export default function AccountBar({
  connectWallet,
  claimAll,
  totalReward,
  medallions,
  balance
}) {
  const address = useContext(WalletAddressContext);
  const [pending, setPending] = useState(false);
  const claim = async () => {
    setPending(true);
    await claimAll();
    setPending(false);
  }

  return (
    <Card className={styles.accountBar}>
      <AccountBarItem>
        {address ? (
          <div className="field">{getDisplayAddress(address)}</div>
        ) : (
          <Button
            variant="dark"
            className={styles.accountBarButton}
            onClick={address ? () => {} : connectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </AccountBarItem>
      <AccountBarItem>
        <Image height={40} width={40} src="/stake/token.png" />
        &nbsp;
        <div className="field">Unclaimed Balance:</div>
        <div>{totalReward}&nbsp;$SHO</div>
        <Button variant="dark" onClick={claim} className={styles.accountBarButton} style={{height: "32px", width: "80px"}} disabled={pending}>
          {pending ?
            <Spinner animation="border" variant="light" size="sm" /> :
            <span>Claim</span>
          }
        </Button>
      </AccountBarItem>
      <AccountBarItem>
        <Image height={40} width={33} src="/stake/medallion.png" />
        &nbsp;
        <div>x{medallions}</div>
      </AccountBarItem>
      <AccountBarItem>
        <div>{balance} $SHO</div>
      </AccountBarItem>
    </Card>
  );
}
