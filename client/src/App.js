// import './App.css';
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";
import ScrollTop from "./ScrollTop";
import EthProvider from "./contexts/EthContext/EthProvider";

function App() {
  return (
    <RecoilRoot>
      <EthProvider>
        <ScrollTop />
        <RootRoute />
      </EthProvider>
    </RecoilRoot>
  );
}

export default App;
