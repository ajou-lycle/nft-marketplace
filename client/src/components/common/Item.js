import React from "react";
import './Item.css';
import IconButton from "@material-ui/core/IconButton";
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import styled from "styled-components";

export default function NftItem() {

  return(
    <div className="NftItem_wrap">
      <h3 className="item_title">
        NFT ITEM
      </h3>
      
      <div className="order_bar">
        <ul className="order_ul">
          <li className="order_li">
            <a className="li_lastely">최신순</a>
          </li>
          <li className="order_li">
            <a className="li_favorite">좋아요순</a>
          </li>
          <li className="order_li">
            <a className="li_view">조회수순</a>
          </li>
        </ul>
      </div>

      <div className="item_grid">

        <div className="nft_item">

          <div className="nft_item_img">
            <div className="nft_item_img_">
              <ItemImg src="img/nft_img.png" loading="lazy" className="item_img" />
              <div>
                <FavoriteBorder />
              </div>
            </div>
          </div>

          <div className="nft_item_txt">

          </div>

        </div>


        
      </div>

    </div>
  );
}

const ItemImg = styled.img`
  width:60px;
`;