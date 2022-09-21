import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import FavoritesPage from "../FavoritesPage";
import ItemPage from "../pages/ItemPage";





export default function RootRoute() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/login" element = {<Login/>}></Route>
        <Route path="/menu" element = {<Menu/>}></Route>
        {/* <Route path="/contents_nft/:nftInfoId" element = {<PageContentNft/>}></Route> */}
        <Route path="/:nftInfoId" element = {<PageContentNft/>}></Route>
        <Route path="/contents_goods" element = {<PageContentGoods/>}></Route>
        <Route path="/add_nft" element = {<PageAddNft/>}></Route>
        <Route path="/edit_nft" element = {<PageEditNft/>}></Route>
        <Route path="/add_goods" element = {<PageAddGoods/>}></Route>
        

        <Route path="/join" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/settings" element={<SettingPage />}/>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/itemPage" element={<ItemPage />}/>
      </Routes>
    </BrowserRouter>

  );
}