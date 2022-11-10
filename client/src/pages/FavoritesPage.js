import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import styled from "styled-components";
import MyPageMenu from "./MyPageMenu";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FavoriteBorder } from "@material-ui/icons";

export default function FavoritesPage() {
  const { memberId } = useParams();

  const [favorData, setFavorData] = useState("");

  const viewFavoritesData = () => {
    let userToken = sessionStorage.getItem("user_token");
    console.log(userToken);
    axios
      .get(`http://13.125.198.232:8080/myPage/9/like`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setFavorData(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewFavoritesData();
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
            <MyPageTitle>My Favorites</MyPageTitle>

            <div>
              <ItemBox>NFT ITEM</ItemBox>
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

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  margin-left: 20px;
`;

const ItemBox = styled.div`
  display: flex;
  margin-right: 10px;
  margin-left: 20px;
  width: 120px;
  font-size: 24px;
  border: 2px solid rgb(46, 204, 113);
  justify-content: center;
`;

const ItemImg = styled.img`
  border-radius: 5px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`;

const CheckSale = styled.span`
  font-size: 11px;
  color: gray;
  border: 2px solid rgb(46, 204, 113);
  border-radius: 4px;
`;
