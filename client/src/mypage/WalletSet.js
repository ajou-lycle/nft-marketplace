import React from "react";
import Header from "../components/common/header";
import MyPageMenu from "../pages/MyPageMenu";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import "./WalletSet.css";
import { useRecoilState } from "recoil";
import { ethState } from "../recoil/Eth";
import { getNftListByWalletAddress, initWeb3 } from "../datas/contract";
import { useEffect } from "react";
import "../datas/contract.js";

export default function WalletPage() {
  // 유저 지갑 주소 가져오는 방법
  // const [eth, setEthState] = useRecoilState(ethState);
  // const wallet_address = eth?.accounts?.[0];
  // console.log("wallet:", wallet_address);

  // // 유저 지갑 잔고 가져오는 방법
  // const ABCD = async () => {
  //   const coinBalance = await getUserCoinBalance(eth);
  // };

  // 유저 토큰 잔고 가져오는 방법
  // const tokenBalance = await getTokenBalance(eth);

  // // 유저가 보유한 NFT 리스트 가져오는 방법
  const [nftList, setNftList] = useRecoilState(ethState);

  useEffect((e) => {
    initWeb3();
    console.log("useEffect시작");
    const viewNFTList = async () => {
      const userNftJsonList = await getNftListByWalletAddress(nftList);
      console.log("Hi");
      console.log("userNftJsonList: ", userNftJsonList);
    };

    viewNFTList();
  }, []);

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
              {/* <div>test : {wallet_address}</div> */}

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
