import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import styled from "styled-components";
import MyPageMenu from "../pages/MyPageMenu";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FavoriteBorder } from "@material-ui/icons";

const FavoritesPage = () => {
  const memberInfoId = window.localStorage.getItem("memberId");
  // const token_ = window.localStorage.getItem("accessToken");
  // console.log(token_);
  const [favorData, setFavorData] = useState("");

  const viewFavoritesData = () => {
    axios
      .get(`http://3.38.210.200:8080/myPage/like/${memberInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFavorData(res.data.itemList);
        console.log("res.data.itemList:", res.data.itemList);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewFavoritesData();
  }, []);

  // useEffect((e) => {
  //   async function viewFavoritesData() {
  //     const res = await axios.get(
  //       `http://3.38.210.200:8080/myPage/like/${memberInfoId}`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
  //         },
  //       }
  //     );
  //     const _favorData = await res.data.itemList.map((rowData) => ({
  //       nft_item_id: rowData.nftItemId,
  //       created_date: rowData.createdDate,
  //       profileImg: rowData.profileImg,
  //       memberId: rowData.memberId,
  //       nickname: rowData.nickname,
  //       nftItemImg: rowData.nftItemImg,
  //       price: rowData.price,
  //       likeCnt: rowData.likeCnt,
  //       title: rowData.title,
  //       view_cnt: rowData.viewCnt,
  //       status: rowData.status,
  //     }));
  //     setFavorData(favorData.concat(_favorData));
  //     console.log(_favorData);
  //   }
  //   viewFavoritesData();
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
        <MyPageTitle>My Favorites</MyPageTitle>

        <div>
          <ItemBox>NFT ITEM</ItemBox>

          <div className="item_grid" style={{ width: "100%" }}>
            {favorData &&
              favorData.map((rowData) => {
                return (
                  <div className="nft_item" key={rowData.nftItemId.toString()}>
                    <Link to={`../contents_nft/${rowData.nftItemId}`}>
                      <div className="nft_item_img">
                        <div className="nft_item_img_">
                          <ItemImg
                            src={rowData.nftItemImg}
                            loading="lazy"
                            className="item_img"
                          />
                          <div>
                            <FavoriteBorder />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="nft_item_txt">
                      <div className="nft_date">
                        <span className="nft_item_views">
                          view {rowData.viewCnt}
                        </span>
                        <span className="nft_item_date">
                          {rowData.createdDate}
                        </span>
                      </div>
                      <div className="nft_name">{rowData.title}</div>
                      <div className="nft_user">
                        <UserImg src={rowData.profileImg} />
                        <span className="nft_item_user">
                          {rowData.nickname}
                        </span>
                      </div>

                      <div className="nft_price">
                        <span>$ {rowData.price}</span>

                        <div className="nft_item_footer">
                          {rowData.status == "sale" ? (
                            <CheckSale>판매중</CheckSale>
                          ) : (
                            <CheckSale>판매완료</CheckSale>
                          )}
                          <div className="nft_item_like_container">
                            <FavoriteBorder
                              style={{
                                color: "gray",
                                float: "right",
                                fontSize: "28px",
                              }}
                            />
                            <div
                              className="nft_item_views"
                              style={{ float: "right" }}
                            >
                              {rowData.likeCnt}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </MyPageContent>
    </div>
  );
};

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
  margin-bottom: 30px;
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

export default FavoritesPage;
