import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/header";
import styled from "styled-components";
import Page1 from "../pages/Page1";
import SignUp from "../SignUp";
import Login from "../pages/login/Login";
import MyPage from "../pages/MyPage.js";
import ProfileSet from "../ProfileSet";
import WalletPage from "../WalletSet";
import Settings from "../Settings";
import SettingPage from "../Settings";
import FavoritesPage from "../FavoritesPage";
import ItemPage from "../pages/ItemPage";


export default function RootRoute() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/login" element = {<Login/>} />
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