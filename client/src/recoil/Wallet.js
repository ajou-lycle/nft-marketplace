import { atom } from "recoil";

const initialWalletState = {
    coinBalance: null,
    tokenBalance: null,
    nftList: null,
};

export const walletState = atom({
    key : "wallet",
    default : initialWalletState,
    dangerouslyAllowMutability: true,
});