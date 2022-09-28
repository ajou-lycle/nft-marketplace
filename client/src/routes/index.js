import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Page1 from "../pages/Page1";
import Login from "../pages/login/Login";
import Menu from "../components/common/Menu";
import PageContentNft from "../pages/PageContentNft";
import PageContentGoods from "../pages/PageContentGoods";
import PageAddNft from "../pages/PageAddNft";
import PageEditNft from "../pages/PageEditNft";
import PageAddGoods from "../pages/PageAddGoods";




import SignUp from "../SignUp";
import MyPage from "../pages/MyPage.js";
import WalletPage from "../WalletSet";
import SettingPage from "../Settings";
import FavoritesPage from "../pages/FavoritesPage";
import ItemPage from "../pages/ItemPage";
import Item2 from "../components/common/Item2";
import GoodsPage from "../pages/GoodsPage";


export default function RootRoute() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/menu" element = {<Menu/>}></Route>
        <Route path="/contents_nft/:nftInfoId" element = {<PageContentNft/>}></Route>
        <Route path="/contents_goods" element = {<PageContentGoods/>}></Route>
        <Route path="/add_nft" element = {<PageAddNft/>}></Route>
        <Route path="/edit_nft/:nftInfoId" element = {<PageEditNft/>}></Route>
        <Route path="/add_goods" element = {<PageAddGoods/>}></Route>

        <Route path="/join" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/settings" element={<SettingPage />}/>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/itemPage" element={<ItemPage />}/>
        <Route path="/market" element={<Page1 />} />
        <Route path="/item2" element={<Item2 />} />
        <Route path="/goods" element={<GoodsPage />} />
      </Routes>
    </BrowserRouter>

  );
}