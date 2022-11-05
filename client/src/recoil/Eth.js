import { atom } from "recoil";

const initialState = {
    artifacts: null,
    web3: null,
    networkID: null,
    contracts: null
};

export const ethState = atom({
    key : "eth",
    default : initialState,
});

// import 'web3';

// const [eth, setEthState] = useRecoilState(ethState);
// const { web3 } = eth;

// web3.contract.transfer.send(from: A, to: B, amount: 1);
  
 
  