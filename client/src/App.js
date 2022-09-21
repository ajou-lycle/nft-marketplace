// import './App.css';
import React from "react";
import { RecoilRoot } from "recoil";
import RootRoute from "./routes";

function App() {
  return (
    <RecoilRoot>
    <RootRoute />
    </RecoilRoot>
  );
}

export default App;
