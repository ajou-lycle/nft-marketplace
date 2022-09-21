import { List } from "@material-ui/core";
import React from "react";


export default function GoodsItem() {


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
              <a className="li_favorite">좋아요순</a>
            </li>
            <li className="order_li">
              <a className="li_view">조회수순</a>
            </li>
          </ul>
      </div>
      <div className="item_grid">
        {List.map((item, index) => {
          return(
            <div>hi</div>
          )
        })}
      </div>


      

    </div>

  );
}