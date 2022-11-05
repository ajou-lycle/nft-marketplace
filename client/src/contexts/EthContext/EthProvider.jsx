import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import { useRecoilState } from "recoil";

import TruffleConfig from "../../config/truffle-config.js";
import { ethState } from '../../recoil/Eth.js';
import ERC1155Token from "../../contracts/ERC1155Token.json";
import ERC1155TokenFactory from "../../contracts/ERC1155TokenFactory.json";
import EthContext from './EthContext.js';

function EthProvider({ children }) {
  const [eth, setEthState] = useRecoilState(ethState);

  const init = useCallback(
    async artifacts => {
      if (artifacts) {
        const web3 = new Web3(Web3.givenProvider || TruffleConfig.goerli_infura.provider());
        const networkID = TruffleConfig.networks.goerli_infura.network_id;

        let address = [], contracts = [];

        try {
          for (let index = 0; index < artifacts.length; index++) {
            const { abi } = artifacts[index];
            address.push(artifacts[index].networks[networkID].address);
            contracts.push(new web3.eth.Contract(abi, address[index]));
          }
        } catch (err) {
          console.error(err);
        }

        setEthState({ artifacts, web3, networkID, contracts });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifacts = [ERC1155Token, ERC1155TokenFactory];

        init(artifacts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(eth.artifacts);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, eth.artifacts]);

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
