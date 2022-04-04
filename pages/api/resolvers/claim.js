import { useEffect, useState } from "react";
import { ethers, Wallet } from "ethers";
import getConfig from 'next/config';
import ShogunStakingABI from "../../../contracts/ShogunStakingPolygon.json";
import ShogunNFTABI from "../../../contracts/ShogunNFT.json";
import MockShoABI from "../../../contracts/MockSho.json";

const STAKE_ADDRESS = process.env.NEXT_PUBLIC_SHOGUN_STAKING_ADDRESS;
const SHOGUN_NFT_ADDRESS = process.env.NEXT_PUBLIC_SHOGUN_NFT_ADDRESS;
const MOCKSHO_ADDRESS = process.env.NEXT_PUBLIC_MOCKSHO_ADDRESS;

export const Claim = async (_, args) => {
  const { requestId } = args;
  const { serverRuntimeConfig } = getConfig();
  const plygonProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MUMBAI_RPC);
  const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RINKEBY_RPC);
  const options = { gasLimit: 5000000 };

  const adminPolygonWallet = new Wallet(serverRuntimeConfig.ADMIN_PRIVATEKEY, plygonProvider);
  const stake = new ethers.Contract(STAKE_ADDRESS, ShogunStakingABI.abi, plygonProvider);

  // const shogunNFT = new ethers.Contract(SHOGUN_NFT_ADDRESS, ShogunNFTABI.abi, ethereumProvider);
  // const mockSho = new ethers.Contract(MOCKSHO_ADDRESS, MockShoABI.abi, plygonProvider);

  // const tx_ = await mockSho.connect(adminPolygonWallet).mint(adminPolygonWallet.address, ethers.utils.parseEther('5000'));
  // const rc_ = await tx_.wait();

  // let tx = await stake.connect(adminPolygonWallet).claimRewards(tokenIds);
  // let rc = await tx.wait();
  // const submitRequestEvent = rc.events.find(e => e.event === 'SubmitRequest');

  // let userTokenIds = await shogunNFT.walletOfOwner(address);
  // userTokenIds = userTokenIds.map(_id => _id.toNumber());
  // const checkTokenIds = submitRequestEvent.args.tokenIds.every(_id => userTokenIds.includes(_id.toNumber()));

  const tx = await stake.connect(adminPolygonWallet).confirmRequest(requestId, options);
  const rc = await tx.wait();
  const claimEvent = rc.events.find(e => e.event === 'Claim');
  const amount = claimEvent.args.amount;
  return `${amount}SHO caimed successful`;
}