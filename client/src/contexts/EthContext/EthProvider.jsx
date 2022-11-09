import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ethState } from '../../recoil/Eth.js';
import { initWeb3, getUserCoinBalance, getTokenBalance, getTokenImageUri, getNftListByWalletAddress, getRegistedNftList, mint } from "../../datas/contract.js";
import EthContext from './EthContext.js';

function EthProvider({ children }) {
  const [eth, setEthState] = useRecoilState(ethState);

  const init = useCallback(
    async () => {
      try {
        let { web3, accounts, networkID, contracts } = await initWeb3();

        const data = {
          web3: web3,
          accounts: accounts,
          networkID: networkID,
          contracts: contracts
        };

        // await mint(data);

        const coinBalance = await getUserCoinBalance(data);
        const tokenBalance = await getTokenBalance(data);
        const uri = await getTokenImageUri(data);
        const userNftList = await getNftListByWalletAddress(data);
        const registedNftList = await getRegistedNftList(data);

        console.log(coinBalance, tokenBalance, uri, userNftList, registedNftList);

        setEthState(data);
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

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

  return (
    <EthContext.Provider value={{
      eth,
      setEthState
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
