import React, { useEffect } from "react";
import {useState} from "react";
import styled from "styled-components";
import './ContentNft.css';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
// import '../datas/contract.js';
import { getNftListByWalletAddress, result} from "../datas/contract.js";
import '../recoil/User.js'; 
import {useRecoilState} from "recoil";
import { isLiked } from "../recoil/User.js";
import { recoilPersist } from "recoil-persist";


function ContentNft()
{

    // const {persistAtom} = recoilPersist()
    const {nftInfoId} = useParams();

    const [d5Like,setD5Like] = useRecoilState(isLiked);
    const [isClicked, setIsClicked] = useState(false);

    const changeContentbarColor = () => {
        if(isClicked === true) setIsClicked(false);
        if(isClicked === false) setIsClicked(true);

    }

    const [contentnftdata,setContentNftData] = useState('');

    const [nftresult, setnftresult] = useState('');

    const onClickShowNft=() => {
        axios.get(`http://13.125.198.232:8080/nftItem/${nftInfoId}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data);
            setContentNftData(res.data);
            
            
        })
        .catch((err) => {console.log("Error", err)});

    }
    

    const ShownftResult=()=> {
        setnftresult(result[0]);
        console.log(nftresult);
        // console.log(result);
        // console.log(getNftListByWalletAddress);
        // console.log(nftresult);
    }

    useEffect(()=> {
        onClickShowNft();
        getNftListByWalletAddress();
        // ShownftResult();
    },[]);

    const onClickLikeNft=() => {

        if(d5Like === "d5_like_false") setD5Like("d5_like_true");
        if(d5Like === "d5_like_true") setD5Like("d5_like_false");

        let userToken = sessionStorage.getItem('user_token');
        console.log(userToken);
        axios.post(`http://13.125.198.232:8080/nftItem/${nftInfoId}/like`, {},
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data)
            // if (res.data.isLike) {
                
            // }
        
    

        })
        .catch((err) => {console.log("Error", err)});

    }

    const onClickDeleteNft=() => {
        let userToken = sessionStorage.getItem('user_token');
        console.log(userToken);
        axios.delete(`http://13.125.198.232:8080/nftItem/${nftInfoId}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data);
            alert("삭제가 완료되었습니다!");
            document.location.href = '/';
        
    

        })
        .catch((err) => {console.log("Error", err)});

    }

    const onClickBuyNft=() => {

            axios.get(`http://13.125.198.232:8080/nftItem/${nftInfoId}/buy`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
            .then((res) => {
                console.log("res.data", res.data);
                // console.log('data is ' + JSON.stringify(res.data));
                alert("구매가 완료되었습니다!");
                document.location.href = '/';
            })
            .catch((err) => {console.log("Error", err)});

    }

    const onClickRealBuyNft=() => {
        console.log(sessionStorage.getItem('user_token'));
        axios.post(`http://13.125.198.232:8080/nftItem/${nftInfoId}/buy`, {},
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data)
        
    

        })
        .catch((err) => {console.log("Error", err)});

    }




    


    return(
        <div className = "whole">
            <div className = "whole_center">
                <div className = "content_pic_and_disc">
                    <div className = "content_pic_and_disc_left">
                <img src = "https://s3.ap-northeast-2.amazonaws.com/lycle-bucket/0xfd191AAcC1C2d499202e85DDCFFA1233674f988c/nfts/png/1.png" className = "content_pic"/>
                <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">EDITION</dt>
                            <dd className="d4_right">{nftresult.edition}</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">DNA</dt>
                            <dd className="d4_right">{nftresult.dna}</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">GRADE</dt>
                            <dd className="d4_right">{nftresult.grade}</dd>
                        </dl>
                </div>
                <div className = "content_pic_disc">
                    <div className = "content_pic_disc_1">
                        <div className="disc_1_1">NFT</div>

                        <div className="disc_1_2">
                            <div className="disc_1_2_big">{nftresult.name}</div>  
                            <div className="d5_bottom_icon">
                                <button onClick={onClickLikeNft} type="button" className={d5Like}></button>
                                <button onClick={ShownftResult} type="button"></button>
                            </div>
                        </div>

                    </div>
                    
                
                    <div className = "content_pic_disc_4">
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

                    <div className = "content_pic_disc_5">

                        <div className="d5_top">
                            <div className="current_price_box">
                                <div className="current_price_text">Current Price is...</div>
                            </div>
                            <div className="total_price">
                                <span className="total_price_right" > $ {contentnftdata.price}</span>
                            </div>
                        </div>

                    </div>

                    <div className="d5_bottom_cart">
                        
                        <div className="d5_bottom_buy_nft">
                            { <NftBuyButton onClick={onClickBuyNft}>Buy Now</NftBuyButton> }
                            </div>
                    </div>

                    




                    
                
            </div>

                </div>
                <div className="disc_long">{nftresult.description}</div>
                {/* <button onClick={onClickShowNft} type="button">조회</button> */}
                <Link to={`/edit_nft/${nftInfoId}`}><button type="button">수정</button></Link>
                <button onClick={onClickDeleteNft} type="button">삭제</button>
                <button onClick={onClickRealBuyNft} type="button">구매 확정</button>
                


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

background-color: ${props => props.backgroundcolor};
color : ${props => props.color};
border: ${props => props.border};
margin-top: ${props => props.margin};
`;

export default ContentNft;