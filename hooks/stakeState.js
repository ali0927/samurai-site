import React from "react";

export const WalletAddressContext = React.createContext(null);
export const ToastsContext = React.createContext(null);

export const SamuraisContext = React.createContext([]);
export const TokenIdsContext = React.createContext([]);

export const ActiveFamilyContext = React.createContext(null);
export const BuildingFamilyContext = React.createContext([]);
export const NewFamiliesContext = React.createContext({});
export const StakedFamiliesContext = React.createContext({});

export const NEW_FAMILY_KEY = "Family";

var newFamilyCounter = 1;

export const getNewFamilyId = () => {
  const id = `Family #${newFamilyCounter}`;
  newFamilyCounter += 1;
  return id;
};
