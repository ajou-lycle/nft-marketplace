import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

import LycleTokens from "../../contracts/LycleTokens.json";
import LycleNFTs from "../../contracts/LycleNFTs.json";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      if (artifacts) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

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

        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifacts = [LycleTokens, LycleNFTs];

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
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
