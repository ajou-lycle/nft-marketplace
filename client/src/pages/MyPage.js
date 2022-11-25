import React from "react";
import Header from "../components/common/header";
import ProfileSet from "../mypage/ProfileSet";
import MyPageMenu from "./MyPageMenu";
import ScrollTop from "../ScrollTop";

export default function MyPage() {
  return (
    <div>
      <ScrollTop/>
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
        <ProfileSet />
      </div>
    </div>
  );
}
