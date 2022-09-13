
import React from "react";
import Header from "../components/common/header";
import NftItem from "../components/common/Item";
import Menu from "../components/common/Menu";
import axios from "axios";

export default function Page1() {


  return(
    <div>
      <Header/>
      <Menu/>
      <NftItem />
    </div>
  );
}