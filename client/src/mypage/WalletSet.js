import React from "react";
import Header from "../components/common/header";
import MyPageMenu from "../pages/MyPageMenu";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import "./WalletSet.css";

export default function WalletPage() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          padding: "10px 0px",
          width: "1100px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <MyPageMenu />
        <div
          style={{
            display: "flex",
            padding: "10px 0px",
            width: "1100px",
            margin: "0 auto",
          }}
        >
          <ColumnLine />

          <MyPageContent className="mypage_content">
            <MyPageTitle>My Wallet</MyPageTitle>

            <div className="mypage_wallet">
              <ProfileInfo>Wallet Address</ProfileInfo>
              <InfoInput placeholder="walletAddress" disabled />

              <ProfileInfo>My Token</ProfileInfo>
              <InfoInput placeholder="token" disabled />

              <ProfileInfo>보유 중인 NFT</ProfileInfo>
              <div>**보유한 nft 아이템 추후 추가</div>
            </div>
          </MyPageContent>
        </div>
      </div>
    </div>
  );
}

const MyPageContent = styled.div`
  margin-left: 10px;
  width: 100%;
  padding: 10px;
`;

const ColumnLine = styled.span`
  display: flex;
  width: 1px;
  height: 100%;
  background: #ddd;
`;

const SaveButton = styled.div`
  width: 100px;
  padding: 10px 0px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  float: right;
  margin-right: 55px;
`;

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  margin-left: 20px;
`;

const ProfileInfo = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.4px;
  margin-bottom: 15px;
`;

const InfoInput = styled.input`
  background-color: #ddd;
  border: none;
  border-radius: 10px;
  width: 440px;
  height: 44px;
  margin-bottom: 30px;
  padding: 0px 20px 0px 20px;
`;
