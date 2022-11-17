import React, { useEffect } from "react";
import { useState } from "react";
import "../nft/ContentNft.css";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

function ContentGoods() {
  const { goodsInfoId } = useParams();

  const [count, setCount] = useState(1);
  const count3 = (count * 15900)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const [useclassName, setUseClassName] = useState("d4_count_down_false");
  // const [d5Like,setD5Like] = useState("d5_like_false");

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

  // const likeClick = () => {
  //     if(d5Like === "d5_like_false") setD5Like("d5_like_true");
  //     if(d5Like === "d5_like_true") setD5Like("d5_like_false");
  // };
  const [isClicked, setIsClicked] = useState(false);

  const changeContentbarColor = () => {
    if (isClicked === true) setIsClicked(false);
    if (isClicked === false) setIsClicked(true);
  };

  const [contentgoodsdata, setContentGoodsData] = useState("");

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
        // console.log('data is ' + JSON.stringify(res.data));
        setContentGoodsData(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    onClickShowGoods();
  }, []);

  // const onClickLikeGoods=() => {
  //     let userToken = sessionStorage.getItem('user_token');
  //     console.log(userToken);
  //     axios.post(`http://localhost:8080/item/${goodsInfoId}/like`, {},
  //     {
  //         withCredentials: true,
  //         headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
  //     .then((res) => {
  //         console.log("res.data", res.data)

  //     })
  //     .catch((err) => {console.log("Error", err)});

  // }

  const onClickDeleteGoods = () => {
    let userToken = sessionStorage.getItem("user_token");
    console.log(userToken);
    axios
      .delete(`http://13.125.198.232:8080/item/${goodsInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        alert("삭제가 완료되었습니다!");
        document.location.href = "/";
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onClickBuyGoods = () => {
    console.log(sessionStorage.getItem("user_token"));
    axios
      .post(
        `http://13.125.198.232:8080/nftItem/${goodsInfoId}/buy`,
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
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="whole">
      <div className="whole_center">
        <div className="content_pic_and_disc">
          <img
            src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
            className="content_pic"
          />
          <div className="content_pic_disc">
            <div className="content_pic_disc_1">
              <div className="disc_1_1">GOODS</div>

              <div className="disc_1_2">
                <div className="disc_1_2_big">{contentgoodsdata.title}</div>
                {/* <div className="d5_bottom_icon">
                                <button onClick={onClickLikeGoods} type="button" className={d5Like}></button>
                            </div> */}
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
                  <span className="total_price_left">$</span>
                  <span className="total_price_right">
                    {" "}
                    {(count * contentgoodsdata.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
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
          </div>
        </div>
        {/* <div className="disc_long">{contentgoodsdata.content}</div> */}
        {/* <button onClick={onClickShowNft} type="button">조회</button> */}
        <Buttons>
          <Link to={`/edit_goods/${goodsInfoId}`}>
            <ButtonEditDelete type="button">수정</ButtonEditDelete>
          </Link>
          <ButtonEditDelete onClick={onClickDeleteGoods} type="button">
            삭제
          </ButtonEditDelete>
        </Buttons>
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

const Buttons = styled.div`
  margin-top: 70px;
  display: flex;
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

const ButtonEditDelete = styled.button`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  text-align: center;
  width: 130px;
  height: 54px;
  border-radius: 30px;
  line-height: 54px;
  font-weight: bold;
  font-size: 20px;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;

  background-color: #fffacd;
  color: black;
  border: 5px solid #d9f1d7;
`;

export default ContentGoods;
