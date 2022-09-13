import React, { useEffect } from "react";
import {useState} from "react";
import styled from "styled-components";
import './ContentNft.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import AddNft from './AddNft.js';


function ContentNft()
{
    const [count,setCount] = useState(1);
    const count2=count*15900;
    const count3=count2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const [useclassName, setUseClassName] = useState("d4_count_down_false");
    const [d5Like,setD5Like] = useState("d5_like_false");

    const countAdd =() => {
        setUseClassName("d4_count_down_true");
        setCount(count+1);
    }
    
    const countMinus =() => {
        if(count>1) {setCount(count-1); setUseClassName("d4_count_down_true");}
        else if(count === 1) setUseClassName("d4_count_down_false");
    }


    const likeClick = () => {
        if(d5Like === "d5_like_false") setD5Like("d5_like_true");
        if(d5Like === "d5_like_true") setD5Like("d5_like_false");
    };
    const [isClicked, setIsClicked] = useState(false);

    const changeContentbarColor = () => {
        if(isClicked === true) setIsClicked(false);
        if(isClicked === false) setIsClicked(true);

    }

    const onClickLikeNft=() => {
        let userToken = sessionStorage.getItem('user_token');
        console.log(userToken);
        axios.post('api/nftItem/5/like', {},
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
        axios.delete('api/nftItem/5',
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
                <img src = "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" className = "content_pic"/>
                <div className = "content_pic_disc">
                    <div className = "content_pic_disc_1">
                        <div className="disc_1_1">NFT</div>

                        <div className="disc_1_2">
                            <div className="disc_1_2_big">psycho</div>  
                            <div className="d5_bottom_icon">
                                <button onClick={onClickLikeNft} type="button" className={d5Like}></button>
                            </div>
                        </div>

                    </div>
                    
                
                    <div className = "content_pic_disc_4">
                        <dl className="content_pic_disc_4_1">
                            <dt className="d4_left">seller</dt>
                            <dd className="d4_right">Moondda</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">views</dt>
                            <dd className="d4_right">1000000</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">likes</dt>
                            <dd className="d4_right">55</dd>
                        </dl>
                        <dl className="content_pic_disc_4_2">
                            <dt className="d4_left">created date</dt>
                            <dd className="d4_right">00.07.23</dd>
                        </dl>
                    </div>

                    <div className = "content_pic_disc_5">

                        <div className="d5_top">
                            <div className="current_price_box">
                                <div className="current_price_text">Current Price is...</div>
                            </div>
                            <div className="total_price">
                                <span className="total_price_right" > $ 18300</span>
                            </div>
                        </div>

                    </div>

                    <div className="d5_bottom_cart">
                        
                        <div className="d5_bottom_buy"><button>Buy Now</button></div>
                    </div>

                    




                    
                
            </div>

                </div>
                <button onClick={onClickDeleteNft} type="button">삭제</button>
                <Link to="/edit_nft"><div>수정</div></Link>
                <div className="disc_long"><button>Buy Now</button></div>
                


            </div>

        </div>
    );
}

export default ContentNft;