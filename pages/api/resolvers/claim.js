import { ethers, Wallet } from "ethers";
import getConfig from 'next/config';
import ShogunStakingABI from "../../../contracts/ShogunStakingPolygon.json";

const CHAINID_POLYGON = process.env.NEXT_PUBLIC_NODE_ENV === 'prod' ? "137": "80001";
const STAKE_ADDRESS = ShogunStakingABI.address[CHAINID_POLYGON];

const polygonRPC = 
  process.env.NEXT_PUBLIC_NODE_ENV === 'prod' ? 
  process.env.NEXT_PUBLIC_RPC_POLYGON: 
  process.env.NEXT_PUBLIC_RPC_MUMBAI;
const plygonProvider = new ethers.providers.JsonRpcProvider(polygonRPC);

export const Claim = async (_, args) => {
  const { requestId } = args;
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

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