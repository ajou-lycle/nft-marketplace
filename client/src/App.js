// import './App.css';
import React from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";
import ScrollTop from "./ScrollTop";
import EthProvider from "./contexts/EthContext/EthProvider";
import { checkMetaMaskInstalled } from "./datas/contract.js";

function App() {
  let isMetaMaskInstalled = checkMetaMaskInstalled();

  return isMetaMaskInstalled ? (
    <RecoilRoot>
      <EthProvider>
        <ScrollTop />
        <RootRoute />
      </EthProvider>
    </RecoilRoot>
  ) : (
    <RecoilRoot>
      <ScrollTop />
      <RootRoute />
    </RecoilRoot>
  );
}

export default App;
