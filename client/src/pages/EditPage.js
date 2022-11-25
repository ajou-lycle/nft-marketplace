import { Menu } from "@material-ui/core";
import React from "react";
import Header from "../components/common/header";
import EditInfo from "../mypage/settings/EditInfo";
import MyPageMenu from "./MyPageMenu";

export default function EditPage() {
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
        <EditInfo />
      </div>
    </div>
  );
}
