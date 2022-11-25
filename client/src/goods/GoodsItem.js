import { List } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FavoriteBorder } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { serverAddress } from "../recoil/User";

export default function GoodsItem() {
  const [inputItem, SetInputItem] = useState([]);

  function sortLike() {
    let likeSorting = [...inputItem];
    let likeCompare = (likeCnt) => (a, b) => {
      return a[likeCnt] < b[likeCnt] ? 1 : a[likeCnt] > b[likeCnt] ? -1 : 0;
    };
    likeSorting.sort(likeCompare("likeCnt"));
    SetInputItem(likeSorting);
  }

  function sortView() {
    let viewSorting = [...inputItem];
    let viewCompare = (viewCnt) => (a, b) => {
      return a[viewCnt] < b[viewCnt] ? 1 : a[viewCnt] > b[viewCnt] ? -1 : 0;
    };
    viewSorting.sort(viewCompare("view_cnt"));
    SetInputItem(viewSorting);
  }

  function sortDate() {
    let dateSorting = [...inputItem];
    let dateCompare = (createdDate) => (a, b) => {
      return a[createdDate] < b[createdDate]
        ? 1
        : a[createdDate] > b[createdDate]
        ? -1
        : 0;
    };
    dateSorting.sort(dateCompare("created_date"));
    SetInputItem(dateSorting);
  }

  useEffect((e) => {
    async function fetchItemData() {
      const res = await axios.get(
        `http://3.38.210.200:8080/item?sort=recent`
      );
      console.log(serverAddress);

      const _inputItem = await res.data.itemList.map((rowData) => ({
        nft_item_id: rowData.itemId,
        created_date: rowData.createdDate,
        item_img: rowData.itemImg,
        price: rowData.price,
        title: rowData.title,
        view_cnt: rowData.viewCnt,
      }));
      SetInputItem(inputItem.concat(_inputItem));
      console.log(_inputItem);
    }
    fetchItemData();
  }, []);

  return (
    <div className="NftItem_wrap">
      <h3 className="item_title">
        <div className="item_title1">GOODS ITEM</div>
      </h3>
      <div className="order_bar">
        <ul className="order_ul">
          <li className="order_li" onClick={sortDate}>
            <a className="li_lastely">최신순</a>
          </li>

          <li className="order_li" onClick={sortView}>
            <a className="li_view">조회수순</a>
          </li>
        </ul>
      </div>
      <RowLine />

      <div className="item_grid">
        {inputItem.map((rowData) => {
          return (
            <div className="nft_item" key={rowData.nft_item_id.toString()}>
              <Link to={`../contents_goods/${rowData.nft_item_id}`}>
                <div className="nft_item_img">
                  <div className="nft_item_img_">
                    <ItemImg
                      src={rowData.item_img}
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
                  <span className="nft_item_user">{rowData.memberId}</span>
                </div>
                <div className="nft_price">$ {rowData.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
