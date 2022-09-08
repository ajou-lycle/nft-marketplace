import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "../pages/Page1";
import Login from "../pages/login/Login";
import Menu from "../components/common/Menu";
import PageAddGoods from "../pages/PageAddGoods";
import PageAddNft from "../pages/PageAddNft";
import PageContentGoods from "../pages/PageContentGoods";
import PageContentNft from "../pages/PageContentNft";

export default function RootRoute() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/menu" element = {<Menu/>}></Route>
        <Route path="/contents_nft" element = {<PageContentNft/>}></Route>
        <Route path="/contents_goods" element = {<PageContentGoods/>}></Route>
        <Route path="/add_nft" element = {<PageAddNft/>}></Route>
        <Route path="/add_goods" element = {<PageAddGoods/>}></Route>
        
      </Routes>
    </BrowserRouter>

  );
}