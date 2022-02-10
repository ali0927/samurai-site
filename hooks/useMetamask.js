import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function useMetaMask(onError) {
  const [provider, setProvider] = useState();
  const [chain, setChain] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  function handleAccountsChanged(addresses) {
    if (provider && addresses.length > 0) {
      setAddress(addresses[0]);
      setSigner(provider.getSigner());
    } else {
      setSigner(undefined);
    }
  }

  async function connectWallet() {
    if (provider) {
      await provider
        .send("eth_requestAccounts")
        .then((addresses) => {
          if (addresses.length > 0) {
            setAddress(addresses[0]);
            setSigner(provider.getSigner());
          }
        })
        .catch((error) => {
          onError({
            title: "Error connecting to wallet",
            message: "Please try again.",
          });
          console.log(error);
        });
    } else {
      onError({
        title: "Web3 error",
        message: "Please install metamask",
      });
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);
      _provider.getNetwork().then(({ chainId }) => setChain(chainId));
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (addresses) => {
        if (addresses.length > 0) {
          setAddress(addresses[0]);
          setSigner(_provider.getSigner());
        }
      });
      return () => {
        window.ethereum.removeAllListeners("chainChanged");
        window.ethereum.removeAllListeners("accountsChanged");
      };
    }
  }, []);

  return [provider, chain, signer, address, connectWallet];
}
