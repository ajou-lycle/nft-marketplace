import React, { useEffect, useState } from "react";
import "./Item.css";
import IconButton from "@material-ui/core/IconButton";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import styled from "styled-components";
import axios from "axios";

export default function NftItem2() {
  const [inputD, setInputD] = useState([]);

  useEffect((e) => {
    async function fetchData() {
      const res = await axios.get(
        "http://3.38.210.200:8080/nftItem?page=0&size=9"
      );
      const _inputD = await res.data.itemList.map((rowData) => ({
        nft_item_id: rowData.nftItemId,
        created_date: rowData.createdDate,
        profileImg: rowData.profileImg,
        memberId: rowData.memberId,
        nftItemImg: rowData.nftItemImg,
        price: rowData.price,
        likeCnt: rowData.likeCnt,
        title: rowData.title,
        view_cnt: rowData.viewCnt,
        status: rowData.status,
      }));
      setInputD(inputD.concat(_inputD));
      console.log(_inputD);
    }
    fetchData();
  }, []);

  return (
    <div className="NftItem_wrap">
      {inputD &&
        inputD.map((rowData) => {
          return (
            <div>
              <h3 className="item_title">GOODS ITEM</h3>
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

              <div>title : {rowData.title}</div>

              <div className="item_grid">
                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">
                        {rowData.created_date}
                      </span>
                    </div>
                    <div className="nft_name">
                      Pyscho NFT ITEM
                      {rowData.seller_id}
                    </div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>

                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">22.07.23</span>
                    </div>
                    <div className="nft_name">Pyscho NFT ITEM</div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>

                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">22.07.23</span>
                    </div>
                    <div className="nft_name">Pyscho NFT ITEM</div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>

                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">22.07.23</span>
                    </div>
                    <div className="nft_name">Pyscho NFT ITEM</div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>

                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">22.07.23</span>
                    </div>
                    <div className="nft_name">Pyscho NFT ITEM</div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>

                <div className="nft_item">
                  <div className="nft_item_img">
                    <div className="nft_item_img_">
                      <ItemImg
                        src="img/nft_img.png"
                        loading="lazy"
                        className="item_img"
                      />
                      <div>
                        <FavoriteBorder />
                      </div>
                    </div>
                  </div>

                  <div className="nft_item_txt">
                    <div className="nft_date">
                      <span className="nft_item_date">22.07.23</span>
                    </div>
                    <div className="nft_name">Pyscho NFT ITEM</div>
                    <div className="nft_user">
                      <UserImg src="img/lamarket_logo.png" />
                      <span className="nft_item_user">UserName</span>
                    </div>
                    <div className="nft_price">$ 0.9</div>
                    <div className="nft_item_views">views 23</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
