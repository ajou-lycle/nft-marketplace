import React from "react";
import Header from "../components/common/header";
import PurchasesList from "../mypage/PurchasesList";
import MyPageMenu from "./MyPageMenu";

export default function PagePurchase() {
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
        <PurchasesList />
      </div>
    </div>
  );
}
