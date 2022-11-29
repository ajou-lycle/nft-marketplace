import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import {
  AccountCircle,
  AccountBalanceWallet,
  Favorite,
  Settings,
  ShoppingBasket,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function MyPageMenu() {
  const memberInfoId = window.localStorage.getItem("memberId");

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 0px",
        width: "30%",
        margin: "0 auto",
        marginTop: "10px",
      }}
    >
      <MypageMenu className="mypage_menu">
        <MypageMenuBar>
          <Link to="/profile" style={{ textDecoration: "none", color: "#333" }}>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <span>Profile</span>
          </Link>
        </MypageMenuBar>

        <RowLine />

        <MypageMenuBar>
          <Link to="/wallet" style={{ textDecoration: "none", color: "#333" }}>
            <IconButton>
              <AccountBalanceWallet />
            </IconButton>
            <span>Wallet</span>
          </Link>
        </MypageMenuBar>

        <RowLine />

        <MypageMenuBar>
          <Link
            to={{
              pathname: `/myPage/like/${memberInfoId}`,
            }}
            style={{ textDecoration: "none", color: "#333" }}
          >
            <IconButton>
              <Favorite />
            </IconButton>
            <span>Favorites</span>
          </Link>
        </MypageMenuBar>

        <RowLine />

        <MypageMenuBar>
          <Link
            to={{
              pathname: `/myPage/buy/${memberInfoId}`,
            }}
            style={{ textDecoration: "none", color: "#333" }}
          >
            <IconButton>
              <ShoppingBasket />
            </IconButton>
            <span>Purchase List</span>
          </Link>
        </MypageMenuBar>

        <RowLine />

        <MypageMenuBar>
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <IconButton>
              <Settings />
            </IconButton>
            <span>Settings</span>
          </Link>
        </MypageMenuBar>
      </MypageMenu>
    </div>
  );
}

const MypageMenu = styled.div`
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

const MypageMenuBar = styled.div`
  align-items: flex-start;
`;

const RowLine = styled.span`
  display: flex;
  width: 100%;
  height: 1px;
  background: #ddd;
`;
