import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FavoriteBorder } from "@material-ui/icons";
import "./Item.css";

const SearchList = () => {
  const [inputData, setInputData] = useState([]);
  const params = useParams();

  function sortLike() {
    let likeSorting = [...inputData];
    let likeCompare = (likeCnt) => (a, b) => {
      return a[likeCnt] < b[likeCnt] ? 1 : a[likeCnt] > b[likeCnt] ? -1 : 0;
    };
    likeSorting.sort(likeCompare("likeCnt"));
    setInputData(likeSorting);
  }

  function sortView() {
    let viewSorting = [...inputData];
    let viewCompare = (viewCnt) => (a, b) => {
      return a[viewCnt] < b[viewCnt] ? 1 : a[viewCnt] > b[viewCnt] ? -1 : 0;
    };
    viewSorting.sort(viewCompare("view_cnt"));
    setInputData(viewSorting);
  }

  function sortDate() {
    let dateSorting = [...inputData];
    let dateCompare = (createdDate) => (a, b) => {
      return a[createdDate] < b[createdDate]
        ? 1
        : a[createdDate] > b[createdDate]
        ? -1
        : 0;
    };
    dateSorting.sort(dateCompare("created_date"));
    setInputData(dateSorting);
  }

  useEffect((e) => {
    async function fetchData() {
      const res = await axios.get(
        "http://3.38.210.200:8080/nftItem?page=0&size=50&title=" +
          params.searchWord
      );
      const _inputData = await res.data.itemList.map((rowData) => ({
        nft_item_id: rowData.nftItemId,
        created_date: rowData.createdDate,
        profileImg: rowData.profileImg,
        nickname: rowData.nickname,
        memberId: rowData.memberId,
        nftItemImg: rowData.nftItemImg,
        price: rowData.price,
        likeCnt: rowData.likeCnt,
        title: rowData.title,
        view_cnt: rowData.viewCnt,
        status: rowData.status,
      }));
      setInputData(inputData.concat(_inputData));
      console.log(_inputData);
    }
    fetchData();
  }, []);

  return (
    <div className="NftItem_wrap">
      <h3 className="item_title">NFT ITEM</h3>
      <div className="order_bar">
        <ul className="order_ul">
          <li className="order_li" onClick={sortDate}>
            <a className="li_lastely">최신순</a>
          </li>
          <li className="order_li" onClick={sortLike}>
            <a className="li_favorite">좋아요순</a>
          </li>
          <li className="order_li" onClick={sortView}>
            <a className="li_view">조회수순</a>
          </li>
        </ul>
      </div>
      <RowLine />
      {/* <div>
          <Link to='/add_nft'>
            <PostButton>NFT 등록하기</PostButton>
          </Link>
        </div> */}

      <div className="item_grid">
        {inputData.map((rowData) => {
          return (
            <div className="nft_item" key={rowData.nft_item_id.toString()}>
              <Link to={`../contents_nft/${rowData.nft_item_id}`}>
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
                    view {rowData.view_cnt}
                  </span>
                  <span className="nft_item_date">{rowData.created_date}</span>
                </div>
                <div className="nft_name">{rowData.title}</div>
                <div className="nft_user">
                  <UserImg src="img/lamarket_logo.png" />
                  <span className="nft_item_user">{rowData.account}</span>
                </div>

                <div className="nft_price">
                  <span>$ {rowData.price}</span>

                  <div style={{ marginTop: "8px" }}>
                    {rowData.status == "sale" ? (
                      <CheckSale>판매중</CheckSale>
                    ) : (
                      <CheckSale>판매완료</CheckSale>
                    )}
                    <div className="nft_item_views" style={{ float: "right" }}>
                      {rowData.likeCnt}
                    </div>

                    <FavoriteBorder
                      style={{
                        color: "gray",
                        float: "right",
                        fontSize: "28px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ItemImg = styled.img`
  border-radius: 5px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`;

const RowLine = styled.span`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 1px;
  background: #ddd;
  margin-bottom: 30px;
`;

const PostButton = styled.button`
  padding: 10px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  border: none;
  float: right;
  margin-bottom: 30px;
`;

const CheckSale = styled.span`
  font-size: 11px;
  color: gray;
  border: 2px solid rgb(46, 204, 113);
  border-radius: 4px;
`;

export default SearchList;
