import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Page1 from "../pages/Page1";
import Login from "../pages/login/Login";
import Menu from "../components/common/Menu";
import PageContentNft from "../pages/PageContentNft";
import PageAddNft from "../pages/PageAddNft";
import PageEditNft from "../pages/PageEditNft";
import PageContentGoods from "../pages/PageContentGoods";
import PageAddGoods from "../pages/PageAddGoods";
import PageEditGoods from "../pages/PageEditGoods";

import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage.js";
// import WalletPage from "../WalletSet";
import WalletPage from "../mypage/WalletSet";
import SettingPage from "../mypage/Settings";
import FavoritesPage from "../pages/FavoritesPage";
import ItemPage from "../pages/ItemPage";
import Item2 from "../components/common/Item2";
import GoodsPage from "../pages/GoodsPage";
import SearchList from "../components/common/Search";
import FilterPage from "../pages/FilterPage";
import PwdChange from "../mypage/PwdChange";
import PwdPage from "../pages/PwdPage";
import PageLanding from "../pages/PageLanding";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLanding/>}/>
        <Route path="/mainpage" element={<Page1 />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/menu" element={<Menu />}></Route>

        <Route
          path="/contents_nft/:nftInfoId"
          element={<PageContentNft />}
        ></Route>
        <Route path="/add_nft" element={<PageAddNft />}></Route>
        <Route path="/edit_nft/:nftInfoId" element={<PageEditNft />}></Route>

        <Route
          path="/contents_goods/:goodsInfoId"
          element={<PageContentGoods />}
        ></Route>
        <Route path="/add_goods" element={<PageAddGoods />}></Route>
        <Route
          path="/edit_goods/:goodsInfoId"
          element={<PageEditGoods />}
        ></Route>

        <Route path="/join" element={<SignUp />} />
        {/* <Route path="/myPage" element={<MyPage />} /> */}
        <Route path="/myPage/:memberInfoId" element={<MyPage />} />

        <Route path="/profile" element={<MyPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/myPage/:memberInfoId/like" element={<FavoritesPage />} />
        <Route path="/itemPage" element={<ItemPage />} />
        <Route path="/market" element={<Page1 />} />
        <Route path="/item2" element={<Item2 />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/search/:searchWord" element={<FilterPage />} />
        <Route path="/settings/pwd" element={<PwdPage />} />
      </Routes>
    </BrowserRouter>
  );
}
