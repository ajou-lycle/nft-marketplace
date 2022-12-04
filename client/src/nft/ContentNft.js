import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import "./ContentNft.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../recoil/User.js";
import { useRecoilState } from "recoil";
import { isLiked,isLoginState } from "../recoil/User.js";
import { recoilPersist } from "recoil-persist";
import { buyNft } from "../datas/contract";
import useEth from "../contexts/EthContext/useEth.js";
import { ethState } from "../recoil/Eth";


function ContentNft() {
  // const {persistAtom} = recoilPersist()
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { nftInfoId } = useParams();

  const [d5Like, setD5Like] = useRecoilState(isLiked);
  const [isClicked, setIsClicked] = useState(false);

  const changeContentbarColor = () => {
    if (isClicked === true) setIsClicked(false);
    if (isClicked === false) setIsClicked(true);
  };

  const [contentnftdata, setContentNftData] = useState("");
  const [sellerAddress,setSellerAddress]=useState('');
  const {eth, setEthState} = useEth();
  const [eth1,setEthstate1] =useRecoilState(ethState);

  const onClickShowNft = () => {
    axios
      .get(`http://3.38.210.200:8080/nftItem/${nftInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setContentNftData(res.data);
        if (res.data.isLike == true) {
          setD5Like("d5_like_true");
        } else {
          setD5Like("d5_like_false");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    onClickShowNft();
  }, []);


  const onClickBuyNftinBlockChain = ()=> {
    buyNft(eth,contentnftdata.collectionName,String(contentnftdata.nftId),sellerAddress,String(contentnftdata.price)).then((result)=> {
      if(result) {alert("거래가 성공하였습니다!");}
      else alert("거래가 실패하였습니다");
    })

  }


  const onClickLikeNft = () => {
    if (d5Like === "d5_like_false") setD5Like("d5_like_true");
    if (d5Like === "d5_like_true") setD5Like("d5_like_false");

    let userToken = sessionStorage.getItem("user_token");
    console.log(userToken);
    axios
      .post(
        `http://3.38.210.200:8080/nftItem/${nftInfoId}/like`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        // if (res.data.isLike) {

        // }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onClickDeleteNft = () => {
    let userToken = sessionStorage.getItem("user_token");
    console.log(userToken);
    axios
      .delete(`http://3.38.210.200:8080/nftItem/${nftInfoId}`, {
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

  const onClickBuyNft = () => {
    axios
      .get(`http://3.38.210.200:8080/nftItem/${nftInfoId}/buy`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setSellerAddress(res.data.sellerWalletAddress);
        console.log(sellerAddress,"주소");
    
        // console.log('data is ' + JSON.stringify(res.data));
        alert("구매가 완료되었습니다!");
        document.location.href = "/mainPage";
        // onClickBuyNftinBlockChain();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onClickRealBuyNft = () => {
    onClickBuyNftinBlockChain();
    console.log(sessionStorage.getItem("user_token"));
    axios
      .post(
        `http://3.38.210.200:8080/nftItem/${nftInfoId}/buy`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        console.log(contentnftdata.nftId,"아이디");

      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="whole">
      <div className="whole_center">
        <div className="content_pic_and_disc">
          <div className="pic_edit">
            <img src={contentnftdata.nftItemImg} className="content_pic" />
            <Content_goods_4>{contentnftdata.content}</Content_goods_4>
          </div>
          <div className="content_pic_disc">
            <div className="content_pic_disc_1">
              <div className="disc_1_1">NFT</div>

              <div className="disc_1_2">
                <div className="disc_1_2_big">{contentnftdata.title}</div>
                <div className="d5_bottom_icon">
                  <button
                    onClick={onClickLikeNft}
                    type="button"
                    className={d5Like}
                  />
                  {/* {contentnftdata.isLike?   ( <button
                    onClick={onClickLikeNft}
                    type="button" className="d5_like_true"/>) : (<button
                      onClick={onClickLikeNft}
                      type="button" className="d5_like_false"/>)} */}
                </div>
              </div>
            </div>

            <div className="content_pic_disc_4">
              <dl className="content_pic_disc_4_1">
                <dt className="d4_left">seller</dt>
                <dd className="d4_right">{contentnftdata.nickname}</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">views</dt>
                <dd className="d4_right">{contentnftdata.viewCnt}</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">likes</dt>
                <dd className="d4_right">{contentnftdata.likeCnt}</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">created date</dt>
                <dd className="d4_right">{contentnftdata.createdDate}</dd>
              </dl>
              <dl className="content_pic_disc_4_2">
                <dt className="d4_left">status</dt>
                <dd className="d4_right">{contentnftdata.status}</dd>
              </dl>
            </div>

            <div className="content_pic_disc_5">
              <div className="d5_top">
                <div className="current_price_box">
                  <div className="current_price_text">Current Price is...</div>
                </div>
                <div className="total_price">
                  <span className="total_price_right">
                    {" "}
                     {contentnftdata.price}  Wei
                  </span>
                </div>
              </div>
            </div>

            <div className="d5_bottom_cart">
              <div className="d5_bottom_buy_nft">
                {<NftBuyButton onClick={onClickBuyNft}>Buy Now</NftBuyButton>}
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={onClickShowNft} type="button">조회</button> */}
        <Buttons>
          <Link
            to={`/edit_nft/${nftInfoId}`}
            style={{ textDecoration: "none" }}
          >
            <ButtonEditDelete type="button">수정</ButtonEditDelete>
          </Link>
          <ButtonEditDelete onClick={onClickDeleteNft} type="button">
            삭제
          </ButtonEditDelete>
          <ButtonEditDelete onClick={onClickRealBuyNft} type="button">
            구매 확정
          </ButtonEditDelete>
        </Buttons>
      </div>
    </div>
  );
}
const NftBuyButton = styled.button`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 54px;
  border-radius: 10px;
  line-height: 54px;
  font-weight: bold;

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  margin-top: ${(props) => props.margin};
`;

const Content_goods_4 = styled.div`
  display: flex;
  width: 400px;
  height: 100px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 50px;
  background-color: #fffacd;
  text-align: center;
  justify-content: center;
  font-weight: bold;
`;
const Buttons = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  text-decoration-line: none;
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

export default ContentNft;