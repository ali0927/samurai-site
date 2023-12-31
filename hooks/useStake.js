import { useCallback, useEffect, useMemo, useState } from "react";

import ShogunNFTABI from "../contracts/ShogunNFT.json";
import ShogunStakingABI from "../contracts/ShogunStaking.json";
import { ethers } from "ethers";
import { getTokenMetadata } from "../utils";
import useMetaMask from "./useMetamask";
import useWallet from "./useWallet";
import { Multicall } from 'ethereum-multicall';

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const STAKE_ADDRESS = ShogunStakingABI.address[CHAIN_ID];
const SHOGUN_NFT_ADDRESS = ShogunNFTABI.address[CHAIN_ID];

export default function useStake(onError, onInfo, onSuccess) {
  const [provider, chain, signer, address, connectWallet] = useWallet(onError);

  const shogunNFT = useMemo(() => {
    if (provider) {
      return new ethers.Contract(
        SHOGUN_NFT_ADDRESS,
        ShogunNFTABI.abi,
        provider
      );
    }
  }, [provider]);
  const stake = useMemo(() => {
    if (provider) {
      return new ethers.Contract(STAKE_ADDRESS, ShogunStakingABI.abi, provider);
    }
  }, [provider]);

  // user's wallet
  const [tokenIds, setTokenIds] = useState([]);
  // samurais available for staking
  const [samurais, setSamurais] = useState([]);
  // families that are already staked
  const [families, setFamilies] = useState({});
  const [medallions, setMedallions] = useState(0);
  const unstakedTokenIds = useMemo(() => {
    const stakedSamuraiIds = new Set(
      Object.values(families)
        .map(({ samurais }) => samurais.map(({ tokenId }) => tokenId))
        .flat()
    );
    return tokenIds.filter((id) => !stakedSamuraiIds.has(id.toNumber()));
  }, [tokenIds, families]);

  const samuraiFilter = useMemo(() => {
    if (shogunNFT && address) {
      const filterFrom = shogunNFT.filters.Transfer(address);
      const filterTo = shogunNFT.filters.Transfer(null, address);
      return [filterFrom, filterTo];
    } else {
      return [];
    }
  }, [shogunNFT, address]);

  const familyFilter = useMemo(() => {
    if (stake && address) {
      const filterStart = stake.filters.TrainingStarted(address);
      const filterEnd = stake.filters.TrainingEnded(address);
      const filterClaimed = stake.filters.RewardClaimed(address);
      return [filterStart, filterEnd, filterClaimed];
    } else {
      return [];
    }
  }, [stake, address]);

  const getRewardForFamily = useCallback(
    async (familyId) => {
      const rewards = await stake.calculateRewards(familyId);
      return rewards;
    },
    [stake]
  );

  const getRewardForFamilyV2 = useCallback(
    async (familyId) => {
      const rewards = await stake.calculateRewardsMultiV2(familyId);
      return rewards;
    },
    [stake]
  );

  const [totalReward, setTotalReward] = useState("0.00");

  const updateTotalRewards = useCallback(async () => {
    if (stake && families) {
      const rewards = await Promise.all(
        Object.keys(families).map(getRewardForFamily)
      );
      const _totalReward = rewards.reduce(
        (acc, cur) => acc.add(cur),
        ethers.constants.Zero
      );
      const _totalRewardEther = ethers.utils.formatEther(_totalReward);
      const _totalRewardTrimmed = parseFloat(_totalRewardEther).toFixed(2);
      console.log(families);
      console.log(`Rewards: ${_totalRewardTrimmed}`);
      await setTotalReward(_totalRewardTrimmed);
    }
  }, [stake, families]);

  const updateTotalRewardsV2 = useCallback(async () => {
    console.log("🚀 | tokenIds", tokenIds);
    if (stake && tokenIds.length > 0) {
      const rewards = await stake.calculateRewardsMultiV2(tokenIds);

      const _totalRewardEther = ethers.utils.formatEther(rewards);
      const _totalRewardTrimmed = parseFloat(_totalRewardEther).toFixed(2);
      console.log(tokenIds);
      console.log(`Rewards: ${_totalRewardTrimmed}`);
      await setTotalReward(_totalRewardTrimmed);
    }
  }, [stake, tokenIds]);

  useEffect(() => {
    updateTotalRewardsV2();
    if (provider) {
      provider.on("block", updateTotalRewardsV2);
      return () => {
        provider.removeAllListeners("block");
      };
    }
  }, [provider, updateTotalRewardsV2]);

  const updateUserBalance = useCallback(async () => {
    if (address) {
      await shogunNFT.walletOfOwner(address).then(setTokenIds);
    }
  }, [address, shogunNFT]);

  const updateUserFamilies = useCallback(async () => {
    if (address && stake) {
      const familyIds = await stake.getUserFamilies(address);
      const _families = await Promise.all(
        familyIds.map(async (familyId) => {
          const {
            familyOwner,
            lastClaim,
            guildMultiplier,
            medallionMultiplier,
            shogunBonus,
            shogunIds,
            trainState,
          } = await stake.getFamily(familyId);
          if (trainState === 1) {
            return;
          }
          const familySamurais = await Promise.all(
            shogunIds.map((id) => getTokenMetadata(id.toNumber()))
          );
          return [
            familyId,
            {
              familyOwner,
              lastClaim,
              guildMultiplier,
              medallionMultiplier,
              shogunBonus,
              samurais: familySamurais,
              trainState,
            },
          ];
        })
      );
      setFamilies(Object.fromEntries(_families.filter((f) => !!f)));
    }
  }, [stake, address]);

  const stakeFamilies = useCallback(
    // families is an array of array of tokenIds
    async (families) => {
      console.log(families);
      if (stake && signer) {
        await stake
          .connect(signer)
          .estimateGas.startTrainingMultiple(families)
          .then((estimatedGas) => {
            const gasLimit = estimatedGas.mul(11).div(10); // 10% gas allowance
            return stake
              .connect(signer)
              .startTrainingMultiple(families, { gasLimit });
          })
          .then((txResponse) => {
            onInfo({
              title: "Training...",
              message: "Trying to start training. View on etherscan:",
              links: [`https://etherscan.io/tx/${txResponse.hash}`],
            });
            return txResponse.wait();
          })
          .then((txReceipt) => {
            onSuccess({
              title: "Training Success",
              message: `Samurais ${families
                .flat()
                .join(", ")} have been sent for training.`,
              links: [`https://etherscan.io/tx/${txReceipt.transactionHash}`],
            });
            return updateUserFamilies();
          })
          .catch((reason) => {
            console.log(reason);
            onError({
              title: "Training Failed",
              message: "Please try again.",
            });
          });
      }
    },
    [stake, signer]
  );

  const unstakeFamilies = useCallback(
    async (familyIds) => {
      const stakedFamilyIds = new Set(Object.keys(families));
      const allValidIds = familyIds.reduce(
        (acc, cur) => acc && stakedFamilyIds.has(cur),
        true
      );
      const _familyIds = new Set(familyIds);
      const samuraiIds = Object.entries(families)
        .filter(([k, v]) => _familyIds.has(k))
        .map(([k, v]) => v.samurais.map((s) => s.tokenId))
        .flat();
      if (stake && signer && allValidIds) {
        await stake
          .connect(signer)
          .estimateGas.endMultipleTraining(familyIds)
          .then((estimatedGas) => {
            const gasLimit = estimatedGas.mul(11).div(10); // 10% gas allowance
            return stake
              .connect(signer)
              .endMultipleTraining(familyIds, { gasLimit });
          })
          .then((txResponse) => {
            onInfo({
              title: "Ending Training...",
              message: "Trying to end training. View on etherscan:",
              links: [`https://etherscan.io/tx/${txResponse.hash}`],
            });
            return txResponse.wait();
          })
          .then((txReceipt) => {
            onSuccess({
              title: "Training Ended",
              message: `Samurais ${samuraiIds.join(
                ", "
              )} have stopped their training.`,
              links: [`https://etherscan.io/tx/${txReceipt.transactionHash}`],
            });
            return updateUserFamilies();
          })
          .catch((reason) => {
            console.log(reason);
            onError({
              title: "End Training Failed",
              message: "Please try again.",
            });
          });
      }
    },
    [stake, signer, families]
  );

  const claimAll = useCallback(async () => {
    if (stake && signer) {
      await stake
        .connect(signer)
        .estimateGas.claimAllRewards()
        .then((estimatedGas) => {
          const gasLimit = estimatedGas.mul(11).div(10);
          return stake.connect(signer).claimAllRewards({ gasLimit });
        })
        .then((txResponse) => {
          onInfo({
            title: "Claiming Rewards...",
            message: "Transaction has been sent. View on etherscan:",
            links: [`https://etherscan.io/tx/${txResponse.hash}`],
          });
          return txResponse.wait();
        })
        .then((txReceipt) => {
          onSuccess({
            title: "Rewards Claimed",
            message: `All rewards have been claimed. View on etherscan:`,
            links: [`https://etherscan.io/tx/${txReceipt.transactionHash}`],
          });
        })
        .catch((reason) => {
          console.log(reason);
          onError({
            title: "Claiming Rewards Failed",
            message: "Please try again.",
          });
        });
    }
  }, [stake, signer]);

  const claimAllV2 = useCallback(async () => {
    if (stake && signer) {
      await stake
        .connect(signer)
        .estimateGas.claimRewardsMultiV2(tokenIds)
        .then((estimatedGas) => {
          const gasLimit = estimatedGas.mul(11).div(10);
          return stake.connect(signer).claimRewardsMultiV2({ gasLimit });
        })
        .then((txResponse) => {
          onInfo({
            title: "Claiming Rewards...",
            message: "Transaction has been sent. View on etherscan:",
            links: [`https://etherscan.io/tx/${txResponse.hash}`],
          });
          return txResponse.wait();
        })
        .then((txReceipt) => {
          onSuccess({
            title: "Rewards Claimed",
            message: `All rewards have been claimed. View on etherscan:`,
            links: [`https://etherscan.io/tx/${txReceipt.transactionHash}`],
          });
        })
        .catch((reason) => {
          console.log(reason);
          onError({
            title: "Claiming Rewards Failed",
            message: "Please try again.",
          });
        });
    }
  }, [stake, signer]);

  const burnSamurais =  useCallback(async (tokenIds) => {
    const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true });
    if (tokenIds.length <= 0) return []
    try {
      const _calls = tokenIds.map(tokenId => {
        return {
            reference: tokenId,
            methodName: 'seppuku', 
            methodParameters: [tokenId]
        }
      });

      const contextCall = [
        {
          reference: 'burnSS',
          contractAddress: SHOGUN_NFT_ADDRESS,
          abi: ShogunNFTABI.abi,
          calls: _calls
        }
      ];
      const res = await multicall.call(contextCall);
      return res.results.burnSS.callsReturnContext;
    } catch (error) {
        console.log(error)
        return []
    }

  }, [address, shogunNFT]);

  // fetching samurai metadata
  useEffect(() => {
    (async function () {
      const _samurais = await Promise.all(
        unstakedTokenIds.map(async (id) => {
          const _id = id.toNumber();
          return {
            ...(await getTokenMetadata(_id)),
          };
        })
      );
      setSamurais(_samurais);
    })();
  }, [unstakedTokenIds]);

  useEffect(() => {
    if (stake && address) {
      // fetching user families
      updateUserFamilies();
      familyFilter.forEach((filter) => {
        stake.on(filter, updateUserFamilies);
      });
      // fetching medallion count
      stake.medallionCount(address).then((n) => setMedallions(n.toNumber()));
      return () => {
        stake.removeAllListeners();
      };
    }
  }, [stake, address, familyFilter, updateUserFamilies]);

  useEffect(() => {
    if (shogunNFT && address) {
      (async () => {
        // fetching user balance
        updateUserBalance();
        samuraiFilter.forEach((filter) => {
          shogunNFT.on(filter, updateUserBalance);
        });
      })();
      return () => {
        shogunNFT.removeAllListeners();
      };
    }
  }, [shogunNFT, address, samuraiFilter, updateUserBalance]);

  return {
    samurais,
    tokenIds,
    families,
    medallions,
    totalReward,
    // totalRewardV2,
    claimAll,
    claimAllV2,
    stakeFamilies,
    unstakeFamilies,
    chain,
    address,
    connectWallet,
    burnSamurais
  };
}
