// 형식을 맞추는 목적(이유): 가독성

//보통은 팀의 통일된 규칙이 정해져있다

//만약 혼자하더라도, 알잘딱깔센

//세로 밀집도: 연관성에 따라 밀집도를 달리 하자

//하나의 개념(생각) 묶어서, 다르면 한 칸 띄어서

//변수는 사용하는 위치에 최대한 가까이 선언한다.
//정말 가독성을 위한 선택. 어차피 js는 호이스팅으로 선언이 스코프 상단으로 끌어당겨진다

//들여쓰기를 무시하지 말자
let i = 0;
let j = 0;
let k = 0;
let m = 0;

while (i > 100) {
  i++;
}
while (j > 100) {
  i++;
}
while (k > 100) {
  k++;
}
while (m > 100) {
  m++;
}

while (i > 100) {
  i++;
}
while (i > 100) {
  i++;
}
while (i > 100) {
  i++;
}
while (i > 100) {
  i++;
}

//다른 함수들과 비교해봤을 때, 통일성을 고려하면 전자이지만, 만약 가독성의 면이라면?
//개인적으로 후자가 더 낫다고 생각한다. 스크롤도 덜 해도 되고,,

// 1. PR을 받아들일 만한 코드인가?
// 2. 팀의 코드 규칙을 준수했는가?
//   - 디자인 패턴
//   - 폴더 아키텍처 //준수. 초반에 협업자와 같이 잡아둔 틀이 있다
//   - ex) NFT폴더, GOODS폴더, MYPAGE폴더, PAGES폴더
//   - 변수명 규칙(카멜, 스네이크 등) //일관성을 유지하려고 노력했다.
//   - nft를 구매하는 코드와 상당히 유사한데, 같은 기능을 하는 함수를 쓸때, 함수명 변수명을 최대한 nft<->goods만 바꾸려고 했다
// 3. 보안 상 문제가 없는 코드인가?
// 4. 알고리즘 적으로 효율적인 코드인가?
// 5. 예외 처리는 어떻게 하였는가?
// 6. 에러 발생 시, 무중단으로 서비스 가능한가?

import React, { useEffect } from "react";
import { useState } from "react";
import "../nft/ContentNft.css";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import "../recoil/User.js";

function ContentGoods() {
  const { goodsInfoId } = useParams(); //nftInfoId
  const [count, setCount] = useState(1);
  const [useclassName, setUseClassName] = useState("count_down_false");

  //   button.d4_count_down_true {
  //     width:27.69px;
  //     height: 28px;
  //     border: 0;
  //     outline: 0;
  //     background-color: transparent;
  //     background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=);
  // }

  // button.d4_count_down_false {
  //     width:27.69px;
  //     height: 28px;
  //     border: 0;
  //     outline: 0;
  //     background-color: transparent;
  //     background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iI0RERCIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=);
  // }

  const CountDown = styled.button`
    width: 27.69px;
    height: 28px;
    border: 0;
    outline: 0;
    background-color: transparent;
    background-image: ${(props) =>
      props.count == 1
        ? "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iI0RERCIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=)"
        : "url(data:-webkit-validation-bubble-message....)"};
  `;
  //   const countPlus = () => {
  //     setCount(count + 1);
  //     setUseClassName("count_down_true");
  //   };

  //   const countMinus = () => {
  //     if (count > 1) {
  //       setCount(count - 1);
  //       setUseClassName("count_down_true");
  //     } else if (count === 1) setUseClassName("count_down_false");
  //   };

  const [isClicked, setIsClicked] = useState(false);

  const changeContentbarColor = () => {
    if (isClicked === true) setIsClicked(false);
    if (isClicked === false) setIsClicked(true);
  };

  const [contentgoodsdata, setContentGoodsData] = useState("");
  const [goodsPrice, setGoodsPrice] = useState(0);

  const onClickBuyGoods = () => {
    console.log(sessionStorage.getItem("user_token"));
    BuyGoodsinBlockChain().then((result) => {
      if (!result) {
        alert("거래가 실패했습니다.");
        return;
      }

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
        })
        .catch((err) => {
          console.log("Error", err);
          alert("거래가 실패했습니다.");
        });
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
              {/* <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">likes</dt>
                            <dd className="d4_right">{contentgoodsdata.likeCnt}</dd>
                        </dl> */}
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
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                    onClick={countPlus}
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
          </div>
        </div>
      </div>
    </div>
  );
}

const Content_goods_4 = styled.div`
  display: flex;
  width: 560px;
  height: 190px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 50px;
  background-color: #fffacd;
  line-height: 200px;
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
