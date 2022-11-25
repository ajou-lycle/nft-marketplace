import React from "react";
import Header from "../components/common/header";
import Menu from "../components/common/Menu";
import NftItem2 from "../components/common/Item2";
import GoodsItem from "../goods/GoodsItem";
import ScrollTop from "../ScrollTop";

export default function GoodsPage() {



  return(
    <div>
      <ScrollTop/>
      <Header />
      <Menu />
      <GoodsItem />
    </div>
  );
}