// import './App.css';
import React from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";
import ScrollTop from "./ScrollTop";
import EthProvider from "./contexts/EthContext/EthProvider";
import { checkMetaMaskInstalled } from "./datas/contract.js";

function App() {
  let isMetaMaskInstalled = checkMetaMaskInstalled();

  if (!isMetaMaskInstalled) {
    // alert(
    //   "LaMarket을 이용하시려면 메타마스크를 설치해주세요!\n\n메타마스크 설치 링크 : https://metamask.io/download/"
    // );
    console.log(
      "LaMarket을 이용하시려면 메타마스크를 설치해주세요!\n\n메타마스크 설치 링크 : https://metamask.io/download/"
    );
  }

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
