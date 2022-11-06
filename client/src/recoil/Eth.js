import { atom } from "recoil";

const initialState = {
    web3: null,
    accounts: null,
    networkID: null,
    contracts: null,
};

export const ethState = atom({
    key : "eth",
    default : initialState,
    dangerouslyAllowMutability: true,
});