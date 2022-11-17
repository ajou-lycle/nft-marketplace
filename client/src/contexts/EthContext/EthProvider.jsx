import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ethState } from "../../recoil/Eth.js";
import {
  initWeb3,
  getUserCoinBalance,
  getTokenBalance,
  getTokenImageUri,
  getNftListByWalletAddress,
  getRegistedNftList,
  mint,
  burn,
} from "../../datas/contract.js";
import EthContext from "./EthContext.js";

function EthProvider({ children }) {
  const [eth, setEthState] = useRecoilState(ethState);

  const init = useCallback(async () => {
    try {
      let { web3, accounts, networkID, contracts } = await initWeb3();

      const ethData = {
        web3: web3,
        accounts: ["0x3f54fDA5DfF0713630E4bEe225591Cdb5f6B4CaE"],
        // accounts: accounts,
        networkID: networkID,
        contracts: contracts,
      };

      // const nftList = await getNftListByWalletAddress(ethData);
      // const walletData = {
      //   coinBalance: await getUserCoinBalance(ethData),
      //   tokenBalance: await getTokenBalance(ethData),
      //   nftList: await getNftListByWalletAddress(ethData)
      // };

      setEthState(ethData);
      console.log(ethData);
      // setWalletState(walletData);
    } catch (e) {
      console.log(e);
    }
  }, [setEthState]);

  useEffect(() => {
    const tryInit = async () => {
      await init();
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = async () => {
      await init();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

  return (
    <EthContext.Provider
      value={{
        eth,
        setEthState,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
