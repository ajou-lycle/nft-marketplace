import React from "react";
import Header from "../components/common/header";
import Menu from "../components/common/Menu";
import SearchList from "../components/common/Search";

export default function FilterPage({searchWord}) {


  return(
    <div>
      <Header/>
      <Menu/>
      <SearchList/>
    </div>
  );
}