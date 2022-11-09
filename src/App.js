// import './App.css';
import React from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";
import ScrollTop from "./ScrollTop";

function App() {
  return (
    <RecoilRoot>
      <ScrollTop/>
    <RootRoute />
    </RecoilRoot>
  );
}

export default App;
