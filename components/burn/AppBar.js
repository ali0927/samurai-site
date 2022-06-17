import styles from "../../styles/stake/AccountBar.module.scss";
import { useContext } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import AccountBarItem from "../stake/AccountBarItem";

import { getDisplayAddress } from "../../utils";
import { WalletAddressContext } from "../../hooks/stakeState";

export default function AppBar({
  connectWallet,
  selectAll,
  allSelected
}) {
  const address = useContext(WalletAddressContext);

  return (
    <Card className={styles.accountBar}>
      <AccountBarItem>
        {address ? (
          <div className="field">{getDisplayAddress(address)}</div>
        ) : (
          <Button
            variant="dark"
            className={styles.accountBarButton}
            onClick={address ? () => { } : connectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </AccountBarItem>
      <AccountBarItem>
        <div className="field">Burn-to-Mint v2</div>
      </AccountBarItem>
      <AccountBarItem>
        <Button 
          variant={allSelected ? "secondary" : "danger"} 
          className={styles.button}
          onClick={selectAll} 
          disabled={allSelected}
        >
          {`${allSelected ? 'Selected' : 'Select'} All`}
        </Button>
      </AccountBarItem>
    </Card>
  );
}
