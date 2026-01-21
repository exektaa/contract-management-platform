import type { Contract } from "./models";

const STORAGE_KEY = "contracts";

export const loadContracts = (): Contract[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveContracts = (contracts: Contract[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
};
