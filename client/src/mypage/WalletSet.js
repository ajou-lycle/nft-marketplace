import React from "react";
import Header from "../components/common/header";
import MyPageMenu from "../pages/MyPageMenu";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import "./WalletSet.css";
import "../components/common/Item.css";
import { useRecoilState } from "recoil";
import { ethState } from "../recoil/Eth";
import {
  checkMetaMaskInstalled,
  getNftListByWalletAddress,
  getTokenBalance,
  initWeb3,
} from "../datas/contract";
import useEth from "../contexts/EthContext/useEth.js";
import { useEffect, useState } from "react";
import "../datas/contract.js";
import "../components/common/Item.css";
import { CollectionNameEnum } from "../datas/enum/collection_name_enum";
import { FavoriteBorder } from "@material-ui/icons";

export default function WalletPage() {
  const { eth, setEthState } = useEth();
  const [userAddress, setUserAddress] =
    useState("지갑 주소를 가져올 수 없습니다.");
  const [nftList, setNftList] = useState([]);
  const [tokenBalance, setTokenBalance] =
    useState("잔고를 가져올 수 없습니다.");

  const initNftList = async () => {
    const result = await getNftListByWalletAddress(eth);
    setNftList(result);
  };

  const initTokenBalance = async () => {
    const result = await getTokenBalance(eth);
    setTokenBalance(result);
  };

  const getUserAddress = () => {
    if (eth.accounts === null) {
      return;
    }

    if (!Array.isArray(eth.accounts)) {
      return;
    }

    setUserAddress(eth.accounts[0]);
  };

  useEffect(() => {
    const tryInit = async () => {
      getUserAddress();
      await initTokenBalance();
      await initNftList();
    };

    tryInit();
  }, [eth]);

  return (
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
          <UserInfo>{userAddress}</UserInfo>

          <ProfileInfo>My Token</ProfileInfo>
          <UserInfo>{tokenBalance}</UserInfo>

          <ProfileInfo>보유 중인 NFT</ProfileInfo>
          <div className="item_grid" style={{ width: "100%" }}>
            {nftList.map((item) => {
              return item?.map((nft) => {
                return (
                  <NftBox>
                    <div className="nft_item_img">
                      <div className="nft_item_img_">
                        <ItemImg
                          src={nft.image}
                          loading="lazy"
                          className="item_img"
                        />
                      </div>
                    </div>
                    <div className="nft_item_txt">
                      <div className="nft_name">{nft.name}</div>
                      <span style={{ display: "flex" }}>{nft.description}</span>
                    </div>

                    <div
                      className="nft_item_txt"
                      style={{ fontStyle: "italic" }}
                    >
                      {nft?.attributes.map((attribute) => {
                        return (
                          <div>
                            <p>
                              {attribute.trait_type}: {attribute.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </NftBox>
                );
              });
            })}
          </div>
        </div>
      </MyPageContent>
    </div>
  );
}

const MyPageContent = styled.div`
  margin-left: 10px;
  width: 100%;
  padding: 10px;
`;

const ItemImg = styled.img`
  border-radius: 5px;
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

const UserInfo = styled.div`
  background-color: #ddd;
  border-radius: 10px;
  width: 440px;
  height: 44px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 20px;
`;

const NftBox = styled.div`
  border: 2px solid gray;
  border-radius: 70px;
  padding: 5px;
  justify-content: center;
  &:hover {
    box-shadow: 10px 10px 10px grey;
  }
`;
