import React from "react";
import Header from "../components/common/header";
import WalletPage from "../mypage/WalletSet";
import MyPageMenu from "./MyPageMenu";

export default function PageWallet() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          padding: "10px 0px",
          width: "1100px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <MyPageMenu />
        <WalletPage />
      </div>
    </div>
  );
}
