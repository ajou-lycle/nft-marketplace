import React, { useEffect } from "react";
import { useState } from "react";
import "../nft/ContentNft.css";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { payLycleToken } from "../datas/contract";
import "../recoil/User.js";
import { useRecoilState } from "recoil";
import useEth from "../contexts/EthContext/useEth.js";

function ContentGoods() {
  const { goodsInfoId } = useParams();

  const [count, setCount] = useState(1);
  const [useclassName, setUseClassName] = useState("d4_count_down_false");
  const { eth, setEthState } = useEth();
  const countAdd = () => {
    setUseClassName("d4_count_down_true");
    setCount(count + 1);
  };

  const countMinus = () => {
    if (count > 1) {
      setCount(count - 1);
      setUseClassName("d4_count_down_true");
    } else if (count === 1) setUseClassName("d4_count_down_false");
  };

  const [contentgoodsdata, setContentGoodsData] = useState("");
  const [goodsPrice, setGoodsPrice] = useState(0);

  const onClickShowGoods = () => {
    axios
      .get(`http://3.38.210.200:8080/item/${goodsInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setContentGoodsData(res.data);
        setGoodsPrice(res.data.price);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    onClickShowGoods();
  }, []);

  const BuyGoodsinBlockChain = async () => {
    return await payLycleToken(eth, String(goodsPrice));
  };

  const onClickBuyGoods = () => {
    console.log(sessionStorage.getItem("user_token"));
    BuyGoodsinBlockChain().then((result) => {
      if (!result) {
        alert("거래가 실패했습니다.");
        return;
      }

      if (result) {
        axios
          .post(
            `http://3.38.210.200:8080/item/${goodsInfoId}/buy`,
            {
              count: count,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
              },
            }
          )
          .then((res) => {
            console.log("res.data", res.data);

            console.log(count + "개 구매완료!");
            alert(count + "개 구매완료!");
            alert("메인페이지에 있는 설문조사를 시행해주시고 경품 받아가세요!");
          })
          .catch((err) => {
            console.log("Error", err);
            alert("거래가 실패했습니다. 잔고를 확인해주세요");
          });
      }
    });
  };

  return (
    <div className="whole">
      <div className="whole_center">
        <div className="content_pic_and_disc">
          <img src={contentgoodsdata.itemImg} className="content_pic" />
          <div className="content_pic_disc">
            <div className="content_pic_disc_1">
              <div className="disc_1_1">GOODS</div>

              <div className="disc_1_2">
                <div className="disc_1_2_big">{contentgoodsdata.title}</div>
              </div>
            </div>

            <div>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">seller</dt>
                <dd className="d4_right">LYCLE</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">views</dt>
                <dd className="d4_right">{contentgoodsdata.viewCnt}</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">created date</dt>
                <dd className="d4_right">{contentgoodsdata.createdDate}</dd>
              </dl>
            </div>

            <Content_goods_4>"{contentgoodsdata.content}"</Content_goods_4>

            <div className="content_pic_disc_5">
              <div className="d5_top">
                <div className="total_price">
                  <span className="total_price_left"></span>
                  <span className="total_price_right">
                    {" "}
                    {(count * contentgoodsdata.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    LYCLE
                  </span>
                </div>
              </div>
            </div>

            <div className="d5_bottom_cart">
              <dl className="count">
                <dt className="d4_left">구매수량</dt>
                <div class="d4_count">
                  <button
                    onClick={countMinus}
                    type="button"
                    className={useclassName}
                  ></button>
                  <div class="d4_count_num">{count}</div>
                  <button
                    onClick={countAdd}
                    type="button"
                    className="d4_count_up"
                  ></button>
                </div>
              </dl>
              <div className="d5_bottom_buy">
                <GoodsBuyButton onClick={onClickBuyGoods}>
                  Buy Now
                </GoodsBuyButton>
              </div>
            </div>
            <div className="buy_alert">
              구매 버튼을 누르신 후 30초 정도 기다려주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Content_goods_4 = styled.div`
  display: flex;
  width: 460px;
  /* height: 190px; */
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 50px 50px 50px 50px;

  background-color: #fffacd;
  text-align: center;
  justify-content: center;
`;

const GoodsBuyButton = styled.button`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 54px;
  border-radius: 10px;
  line-height: 54px;
  font-weight: bold;
  font-size: 20px;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: 3px solid black;
  margin-top: ${(props) => props.margin};
`;

export default ContentGoods;
