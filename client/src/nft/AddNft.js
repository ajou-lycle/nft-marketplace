import React, { useCallback, useEffect, useState} from "react";
import './AddNft.css';
import styled from "styled-components";
import { useRecoilState } from "recoil";
import axios from 'axios';
import {checkMetaMaskInstalled, getNftListByWalletAddress, initWeb3,initERC1155Token} from "../datas/contract.js";
import { walletState } from "../recoil/Wallet.js";
import useEth from "../contexts/EthContext/useEth.js";
import { CollectionNameEnum } from "../datas/enum/collection_name_enum.js";
import TestNftImgList from './TestNftImgList.js';

//import { Info } from "@material-ui/icons";

function AddNft()
{
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [nftList,setNftList] =useState([]);
    const {eth, setEthState} = useEth();

    const [nftitemImg, setnftitemImg] = useState('');
    const [nfttitle, setnftTitle] = useState('');
    const [nftprice, setnftPrice] = useState(0);
    const [nftcontent, setnftContent] = useState('');

    const onClickAddNft=() => {
        axios.post('http://13.125.198.232:8080/nftItem', {
            // userData
        'nftItemImg' : nftitemImg,
        'title' : nfttitle,
        'price': nftprice,
        'content' : nftcontent
        }
        ,  {
            withCredentials:true,
            // headers: {
            //     // "Access-Control-Allow-Origin" : "http://localhost:8080",
            //     Authorization: 'Bearer ${userToken}',
            //     "Content-Type" : "application/x-www-form-urlencoded"
            // }
            headers: {
            Authorization: `Bearer ${sessionStorage.getItem('user_token')}`, }
        }, )
        .then((res) => {
            console.log("res.data", res.data)
            alert("등록이 완료되었습니다!");
            document.location.href = '/';
        })
        .catch((err) => {console.log("Error", err)});
    
    }

    

    useEffect(() => {
            getAddress();
    }, [eth]);

        //initWeb3();
        const getAddress = async() => {
           const result = await getNftListByWalletAddress(eth);
           setNftList(result);
           console.log(result[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0]);
        }

    const getData = () => {
        if(nftList.length == 0) {
            return <p style={{ display: "inline" }}></p>
        }

        return <p>{nftList[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0].name}</p>
    }

    return(
        <div className = "whole_nft_add">
            <div className = "whole_center_nft_add">
                <div className = "nft_add_form">
                <div className = "nft_add_form_disc">
                    <div className = "nft_add_form_disc_1">
                        <div className="nft_add_form_disc_1_2">
                            <div className="addnft_title">
                                <div className="addnft_title_text"></div>
                            </div>
                        
                        </div>
                    </div>
                    <div className = "add_things">
                        <dl className="add_name">
                            <dt className="d_left"></dt>
                            <dd><NftAddLeft type='text' id="nfttitle" placeholder="Enter NFT name" value={nfttitle} onChange={(e) => setnftTitle(e.target.value)}></NftAddLeft></dd>
                        </dl>
                        <dl className="add_image">
                            <dt className="d_left">NFT CONTENT{getData()}</dt>
                            <dd>< textarea id="nftcontent" placeholder="Enter NFT content" value={nftcontent} onChange={(e) => setnftContent(e.target.value)} style={{width:'350px',padding: '20px', height:'70px', resize:'none',border: '1px solid grey'}}/></dd>
                        </dl>
                        <dl className="add_content">
                            <dt className="d_left">NFT IMAGE</dt>
                            <dd><NftAddLeft type='text' id="nftitemImg" placeholder="Enter NFT image" value={nftitemImg} onChange={(e) => setnftitemImg(e.target.value)}></NftAddLeft></dd>
                        </dl>
                        <dl className="add_content">
                            <dt className="d_left">NFT PRICE</dt>
                            <dd><NftAddLeft type="number" id="nftprice" placeholder="Enter NFT price" value={nftprice} onChange={(e) => setnftPrice(e.target.value)}></NftAddLeft></dd>
                        </dl>
                    </div>

                    <div className="nft_add_button">
                    
                    <NftAddButton backgroundcolor="rgb(255,255,255)" color="#44C97C" border="1px solid #44C97C" type="button" height="54" radius="3" margin="0px" ><span class="css-ymwvow e4nu7ef1">취소</span></NftAddButton>
                    <NftAddButton onClick={() => {
                        onClickAddNft();
                    }} backgroundcolor="#44C97C" color="rgb(255,255,255)" border="0px none" type="button" height="54" radius="3" margin="0px"><span class="css-ymwvow e4nu7ef1">등록</span></NftAddButton>
                    
                    
                
            
                    </div>

                </div>
                </div>
                <div className="my_nft">
                    <TestNftImgList></TestNftImgList>
                    
                </div>


            </div>

        </div>
    );
}

export default AddNft;

const NftAddButton = styled.button`
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

const NftAddLeft = styled.input`
    width:350px;
    height: 50px;
    border: 1px solid grey;
    border-radius:10px;
    align-items:center;
    font-size:15px;
    padding-left: 20px;
    `;