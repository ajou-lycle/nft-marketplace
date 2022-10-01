import { List } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FavoriteBorder } from "@material-ui/icons";
import styled from "styled-components";


export default function GoodsItem() {

  const [inputItem, SetInputItem] = useState([]);


  useEffect((e) =>  {
    async function fetchItemData() {
      const res = await axios.get('http://localhost:8080/item?sort=recent');
      const _inputItem = await res.data.itemList.map((rowData) => ({
        nft_item_id : rowData.itemId,
        created_date : rowData.createdDate,
        item_img : rowData.itemImg,
        price : rowData.price,
        title : rowData.title,
        view_cnt : rowData.viewCnt,
      }));
      SetInputItem(inputItem.concat(_inputItem));
      console.log(_inputItem);

    }
    fetchItemData();
    
  }, []);

  const showLike = () => {
    axios.get('http://localhost:8080/item?sort=like');
  }


  return(
    <div className="NftItem_wrap">
      <h3 className="item_title">
        GOODS ITEM
      </h3>
      <div className="order_bar">
          <ul className="order_ul">
            <li className="order_li">
              <a className="li_lastely">최신순</a>
            </li>
            <li className="order_li">
              <a className="li_favorite" onClick={showLike()}>좋아요순</a>
            </li>
            <li className="order_li">
              <a className="li_view">조회수순</a>
            </li>
          </ul>
      </div>
      <RowLine />
      <div>
          <PostButton>NFT 등록하기</PostButton>
        </div>

      <div className="item_grid">
              {inputItem.map((rowData) => {
                return (
                    <div className="nft_item" key={rowData.nft_item_id.toString()}>
                      <div className="nft_item_img">
                        <div className="nft_item_img_">
                          <ItemImg src="img/nft_img.png" loading="lazy" className="item_img" />
                          <div>
                            <FavoriteBorder />
                          </div>
                        </div>
                      </div>

                      <div className="nft_item_txt">
                        <div className="nft_date">
                          <span className="nft_item_views">
                            view {rowData.view_cnt}
                          </span>
                          <span className="nft_item_date">{rowData.created_date}</span>
                        </div>
                        <div className="nft_name">
                          {rowData.title}
                        </div>
                        <div className="nft_user">
                          <UserImg src="img/lamarket_logo.png" />
                          <span className="nft_item_user">{rowData.memberId}</span>
                        </div>
                        <div className="nft_price">
                          $ {rowData.price}
                        </div>
                        

                      </div>

                    </div> 

                  
                )
              })}

      </div>


      

    </div>

  );
}


const ItemImg = styled.img`
  border-radius:5px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius:70%;
  
`;

const RowLine = styled.span`
  display:flex;
  width:100%;
  justify-content:center;
  height:1px;
  background:#ddd;
  margin-bottom:30px;
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
  margin-right:20px;
  border:none;
  float:right;
  margin-bottom:30px;
`;