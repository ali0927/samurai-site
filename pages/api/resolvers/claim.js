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
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  const plygonProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_POLYGON_RPC);
  const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC);
  const options = { gasLimit: 5000000 };

  const adminPolygonWallet = new Wallet(process.env.NEXT_PUBLIC_ADMIN_PRIVATEKEY, plygonProvider);
  const stake = new ethers.Contract(STAKE_ADDRESS, ShogunStakingABI.abi, plygonProvider);

  const tx = await stake.connect(adminPolygonWallet).confirmRequest(requestId, options);
  const rc = await tx.wait();
  const claimEvent = rc.events.find(e => e.event === 'Claim');
  const amount = ethers.utils.formatEther(claimEvent.args.amount);
  const _amount = parseFloat(amount).toFixed(2);
  return `${_amount}SHO caimed successful`;
}