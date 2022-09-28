import React, { useEffect } from "react";
import {useState} from "react";
import styled from "styled-components";
import './ContentNft.css';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";


function ContentNft()
{
    const {nftInfoId} = useParams();

    const [d5Like,setD5Like] = useState("d5_like_false");
    const [isClicked, setIsClicked] = useState(false);

    const changeContentbarColor = () => {
        if(isClicked === true) setIsClicked(false);
        if(isClicked === false) setIsClicked(true);

    }

    const [contentdata,setContentData] = useState('');

    const onClickShowNft=() => {
        axios.get(`http://localhost:8080/nftItem/${nftInfoId}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data);
            setContentData(res.data);
            
            
        })
        .catch((err) => {console.log("Error", err)});

    }

    useEffect(()=> {
        onClickShowNft();
    },[]);

    const onClickLikeNft=() => {

        if(d5Like === "d5_like_false") setD5Like("d5_like_true");
        if(d5Like === "d5_like_true") setD5Like("d5_like_false");

        let userToken = sessionStorage.getItem('user_token');
        console.log(userToken);
        axios.post(`http://localhost:8080/nftItem/${nftInfoId}/like`, {},
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data)
        
    

        })
        .catch((err) => {console.log("Error", err)});

    }

    const onClickDeleteNft=() => {
        let userToken = sessionStorage.getItem('user_token');
        console.log(userToken);
        axios.delete(`http://localhost:8080/nftItem/${nftInfoId}`,
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

            axios.get(`http://localhost:8080/nftItem/${nftInfoId}/buy`,
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



    


    return(
        <div className = "whole">
            <div className = "whole_center">
                <div className = "content_pic_and_disc">
                <img src = "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" className = "content_pic"/>
                <div className = "content_pic_disc">
                    <div className = "content_pic_disc_1">
                        <div className="disc_1_1">NFT</div>

                        <div className="disc_1_2">
                            <div className="disc_1_2_big">{contentdata.title}</div>  
                            <div className="d5_bottom_icon">
                                <button onClick={onClickLikeNft} type="button" className={d5Like}></button>
                            </div>
                        </div>

                    </div>
                    
                
                    <div className = "content_pic_disc_4">
                        <dl className="content_pic_disc_4_1">
                            <dt className="d4_left">seller</dt>
                            <dd className="d4_right">{contentdata.nickname}</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">views</dt>
                            <dd className="d4_right">{contentdata.viewCnt}</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">likes</dt>
                            <dd className="d4_right">{contentdata.likeCnt}</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">created date</dt>
                            <dd className="d4_right">{contentdata.createdDate}</dd>
                        </dl>
                    </div>

                    <div className = "content_pic_disc_5">

                        <div className="d5_top">
                            <div className="current_price_box">
                                <div className="current_price_text">Current Price is...</div>
                            </div>
                            <div className="total_price">
                                <span className="total_price_right" > $ {contentdata.price}</span>
                            </div>
                        </div>

                    </div>

                    <div className="d5_bottom_cart">
                        
                        <div className="d5_bottom_buy"><button onClick={onClickBuyNft}>Buy Now</button></div>
                    </div>

                    




                    
                
            </div>

                </div>
                <div className="disc_long">{contentdata.content}</div>
                {/* <button onClick={onClickShowNft} type="button">조회</button> */}
                <Link to={`/edit_nft/${nftInfoId}`}><button type="button">수정</button></Link>
                <button onClick={onClickDeleteNft} type="button">삭제</button>
                


            </div>

        </div>
    );
}

export default ContentNft;