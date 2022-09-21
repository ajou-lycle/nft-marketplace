import React, { useEffect, useState} from "react";
import './AddNft.css';
import styled from "styled-components";
import axios from 'axios';
import {useRecoilState} from "recoil";
import { titleState,itemImgState,priceState,contentState } from "../recoil/User";

//import { Info } from "@material-ui/icons";


function EditNft()
{

    const info_id = 6;

    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [content,setContent] = useState('');


    // const userData = {
    //     title : title,
    //     price : price,
    //     content : content
    // };
    const [contentsellerdata,setContentSellerData] = useState('');
    const ShowSellerinfo=() => {
        axios.get(`api/nftItem/post`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }})
        .then((res) => {
            console.log("res.data", res.data);
            // console.log('data is ' + JSON.stringify(res.data));
            setContentSellerData(res.data);
            
            
        })
        .catch((err) => {console.log("Error", err)});

    }
    useEffect(()=> {
        ShowSellerinfo();
    },[]);


    const onClickEditNft=() => {
        console.log('add nft');
        axios.put('api/nftItem/3', {
        title : title,
        price : price,
        content : content

        }
        ,  {
            withCredentials:true,
            headers: {
            Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }
        }, )
        .then((res) => {
            console.log("res.data", res.data);
            alert('수정이 완료되었습니다!');
            document.location.href = '/';

        
        
    

        })
        .catch((err) => {console.log("Error", err)});
    
    }




    return(
        <div className = "whole_nft_add">
            <div className = "whole_center_nft_add">
                <div className = "nft_add_form">
                <div className = "nft_add_form_disc">
                    <div className = "nft_add_form_disc_1">
                        <div className="nft_add_form_disc_1_2">
                            <div className="addnft_title">
                                <div className="addnft_title_text">NFT 수정</div>
                            </div>
                        
                        </div>
                    </div>
                    <div className = "add_things">
                        {/* <form onSubmit= {OnClickAddNft}></form> */}
                        <dl className="add_name">
                            <dt className="d_left">SELLER INFO</dt>
                            {/* <dd className="d4_right">{contentdata.nickname}</dd> */}
                            <dd><span>{contentsellerdata.profileImg}</span><span>{contentsellerdata.nickname}</span></dd>
                        </dl>
                        <dl className="add_name">
                            <dt className="d_left">NFT IMAGE</dt>
                            <dd>{contentsellerdata.nftImg}</dd>
                        </dl>
                        <dl className="add_name">
                            <dt className="d_left">NFT NAME</dt>
                            <dd><NftEditLeft type='text' id="title" placeholder="Enter NFT name" value={title} onChange={(e) => setTitle(e.target.value)}></NftEditLeft></dd>
                        </dl>
                        <dl className="add_image">
                            <dt className="d_left">NFT CONTENT</dt>
                            <dd>< textarea id="content" placeholder="Enter NFT content" value={content} onChange={(e) => setContent(e.target.value)} style={{width:'350px',padding: '20px', height:'70px', resize:'none',border: '1px solid grey'}}/></dd>
                        </dl>
                        {/* <dl className="add_content">
                            <dt className="d_left">NFT IMAGE</dt>
                            <dd><NftEditLeft type='text' id="itemImg" placeholder="Enter NFT image" value={itemImg} onChange={(e) => setitemImg(e.target.value)}></NftEditLeft></dd>
                        </dl> */}
                        <dl className="add_content">
                            <dt className="d_left">NFT PRICE</dt>
                            <dd><NftEditLeft type="number" id="price" placeholder="Enter NFT price" value={price} onChange={(e) => setPrice(e.target.value)}></NftEditLeft></dd>
                        </dl>
                    </div>

                    <div className="nft_add_button">
                    
                    <NftEditButton backgroundcolor="rgb(255,255,255)" color="#44C97C" border="1px solid #44C97C" type="button" height="54" radius="3" margin="0px" ><span class="css-ymwvow e4nu7ef1">취소</span></NftEditButton>
                    <NftEditButton onClick={onClickEditNft} backgroundcolor="#44C97C" color="rgb(255,255,255)" border="0px none" type="button" height="54" radius="3" margin="0px"><span class="css-ymwvow e4nu7ef1">등록</span></NftEditButton>
                    
                    
                    
                
            
                    </div>

                </div>
                </div>


            </div>

        </div>
    );
}

export default EditNft;

const NftEditButton = styled.button`
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

const NftEditLeft = styled.input`
    width:350px;
    height: 50px;
    border: 1px solid grey;
    border-radius:10px;
    align-items:center;
    font-size:15px;
    padding-left: 20px;
    `;