// import './App.css';
import React, { useEffect, useState, } from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";
import ScrollTop from "./ScrollTop";
import EthProvider from "./contexts/EthContext/EthProvider";
import { checkMetaMaskInstalled } from "./datas/contract.js";

function App() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

  useEffect(() => {
    setIsMetaMaskInstalled(checkMetaMaskInstalled());
    console.log(`app.js ${isMetaMaskInstalled}`);
  }, [isMetaMaskInstalled]);

  return (
    <RecoilRoot>
      <EthProvider>
        <ScrollTop />
        <RootRoute />
      </EthProvider>
    </RecoilRoot>
  );
  // return isMetaMaskInstalled ? (
  //   <RecoilRoot>
  //     <EthProvider>
  //       <ScrollTop />
  //       <RootRoute />
  //     </EthProvider>
  //   </RecoilRoot>
  // ) : (
  //   <RecoilRoot>
  //     <ScrollTop />
  //     <RootRoute />
  //   </RecoilRoot>
  // );
}

export default App;
