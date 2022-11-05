import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from "recoil";
import ScrollTop from './ScrollTop';
import EthProvider from './contexts/EthContext/EthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <EthProvider>
      <ScrollTop />
      <App />
      </EthProvider>
  </RecoilRoot>
);
