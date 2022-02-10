import { ethers } from "ethers";
import { useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "cbeb3c15311a4fa6b7f374c92e07c524",
    },
  },
};

export default function useWallet(onError) {
  const [web3Provider, setWeb3Provider] = useState();
  const [provider, setProvider] = useState();
  const [chain, setChain] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  async function connectWallet() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      await web3Modal
        .connect()
        .then((p) => {
          setWeb3Provider(p);
        })
        .catch((error) => {
          onError({
            title: "Error connecting to wallet",
            message: "Please try again.",
          });
          console.log(error);
        });
    }
  }

  function onAccountsChanged(addresses) {
    if (addresses.length > 0) {
      setAddress(addresses[0]);
      setSigner(provider?.getSigner());
    }
  }

  useEffect(() => {
    if (web3Provider) {
      const _provider = new ethers.providers.Web3Provider(web3Provider);
      setProvider(_provider);
      _provider.getNetwork().then(({ chainId }) => setChain(chainId));
      _provider.listAccounts().then((addresses) => {
        if (addresses.length > 0) {
          setAddress(addresses[0]);
          setSigner(_provider.getSigner());
        }
      });
      web3Provider.on("chainChanged", () => {
        window.location.reload();
      });
      web3Provider.on("accountsChanged", onAccountsChanged);
      return () => {
        web3Provider.removeAllListeners("chainChanged");
        web3Provider.removeAllListeners("accountsChanged");
      };
    }
  }, [web3Provider]);

  return [provider, chain, signer, address, connectWallet];
}
