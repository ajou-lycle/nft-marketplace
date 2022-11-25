import React from "react";
import Header from "../components/common/header";
import Menu from "../components/common/Menu";
import Login from "./login/Login";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <Menu />
      <Login />
    </div>
  );
}
