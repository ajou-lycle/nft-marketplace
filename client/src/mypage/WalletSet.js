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
  const [nftList, setNftList] = useState([]);
  const [coinBalance, setCoinBalance] = useState(-1);

  useEffect(() => {
    getAddress();
    // tokenBalance();
  }, [eth]);

  // initWeb3();
  const getAddress = async () => {
    const result = await getNftListByWalletAddress(eth);
    setNftList(result);
    console.log("getAddress시작", eth);
    console.log(result[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0]);
  };

  const tokenBalance = async () => {
    const tokenResult = getTokenBalance(eth);
    setEthState(tokenResult);
    console.log("tokenBalance시작");
    console.log("tokenResult: ", tokenResult);
    console.log("tokenEth", eth);
  };

  // tokenBalance();

  // const showBalance = () => {
  //   if (coinBalance === -1) {
  //     return <p>"잔고를 불러오는 중입니다"</p>;
  //   }

  //   return <p>{coinBalance}</p>;
  // };
  // const getData = () => {
  //   if (nftList.length == 0) {
  //     return <p style={{ display: "inline" }}></p>;
  //   }

  //   return (
  //     <p>{nftList[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0].name}</p>
  //   );
  // };
  // const [nftList, setNftList] = useRecoilState(ethState);

  // useEffect((e) => {
  //   initWeb3();
  //   console.log("useEffect시작");
  //   const viewNFTList = async () => {
  //     const userNftJsonList = await getNftListByWalletAddress(nftList);
  //     console.log("Hi");
  //     console.log("userNftJsonList: ", userNftJsonList);
  //   };

  //   viewNFTList();
  // }, []);

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
          <UserInfo>{eth.accounts}</UserInfo>

          <ProfileInfo>My Token</ProfileInfo>
          <UserInfo>{}</UserInfo>

          <ProfileInfo>보유 중인 NFT</ProfileInfo>
          <div
            className="item_grid"
            style={{ border: "2px solid pink", width: "100%" }}
          >
            {nftList.map((item) => {
              switch (nftList.indexOf(item)) {
                case CollectionNameEnum.LACK_OF_SLEEP_LAMA.index:
                  let imgList = [];

                  for (const lslNft of item) {
                    imgList.push(
                      <div>
                        <div className="nft_item_img">
                          <div className="nft_item_img_">
                            <ItemImg
                              src={lslNft.image}
                              loading="lazy"
                              className="item_img"
                            />
                          </div>
                        </div>
                        <div className="nft_item_txt">
                          <div className="nft_name">{lslNft.name}</div>
                          <span style={{ display: "flex" }}>
                            {lslNft.description}
                          </span>
                        </div>

                        <div
                          className="nft_item_txt"
                          style={{ fontStyle: "italic" }}
                        >
                          {lslNft.attributes.map((attribute) => {
                            return (
                              <div>
                                <p>
                                  {attribute.trait_type}: {attribute.value}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return imgList;
                default:
                  break;
              }
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
