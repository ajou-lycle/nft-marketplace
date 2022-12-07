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
import PageDeleteGoods from "../pages/PageDeleteGoods";

import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage.js";
import GoodsPage from "../pages/GoodsPage";
import FilterPage from "../pages/FilterPage";
import PwdPage from "../pages/PwdPage";
import EditPage from "../pages/EditPage";
import PageWallet from "../pages/PageWallet";
import PageLike from "../pages/PageLike";
import PageSettings from "../pages/PageSettings";

import PageLanding2 from "../pages/PageLanding2";
import PagePurchase from "../pages/PagePurchase";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLanding2 />} />
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
        <Route
          path="/delete_goods/:goodsInfoId"
          element={<PageDeleteGoods />}
        ></Route>

        <Route path="/join" element={<SignUp />} />
        <Route path="/myPage/:memberInfoId" element={<MyPage />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/wallet" element={<PageWallet />} />
        <Route path="/settings" element={<PageSettings />} />
        <Route path="/myPage/like/:memberInfoId" element={<PageLike />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/search/:searchWord" element={<FilterPage />} />
        <Route path="/settings/pwd" element={<PwdPage />} />
        <Route path="/settings/edit" element={<EditPage />} />
        <Route path="/myPage/buy/:memberInfoId" element={<PagePurchase />} />
      </Routes>
    </BrowserRouter>
  );
}
