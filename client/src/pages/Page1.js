import React from "react";
import Header from "../components/common/header";
import NftItem from "../components/common/Item";
import Menu from "../components/common/Menu";
import ScrollTop from "../ScrollTop";

export default function Page1() {


  return(
    <div>
      <ScrollTop/>
      <Header/>
      <Menu/>
      <NftItem />
      
    </div>
  );
}