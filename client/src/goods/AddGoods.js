import React, { useEffect, useState } from "react";
import './AddGoods.css';
import styled from "styled-components";
import axios from 'axios';

function AddGoods()
{
    


    return(
        <div className = "whole_nft_add">
            <div className = "whole_center_nft_add">
                <div className = "nft_add_form">
                <div className = "nft_add_form_disc">
                    <div className = "nft_add_form_disc_1">
                        <div className="nft_add_form_disc_1_2">
                            <div className="addnft_title">
                                <div className="addnft_title_text">GOODS 등록</div>
                            </div>
                        
                        </div>
                    </div>
                    <div className = "add_things">
                        <dl className="add_name">
                            <dt className="d_left">GOODS NAME</dt>
                            <dd className="d_right">name</dd>
                        </dl>
                        <dl className="add_content">
                            <dt className="d_left">GOODS CONTENT</dt>
                            <dd className="d_right">content</dd>
                        </dl>
                        <dl className="add_image">
                            <dt className="d_left">GOODS IMAGE</dt>
                            <dd className="d_right">image</dd>
                        </dl>
                        <dl className="add_content">
                            <dt className="d_left">GOODS PRICE</dt>
                            <dd className="d_right">price</dd>
                        </dl>
                    </div>

                    <div className="nft_add_button">
                    
                    <NftAddButton backgroundcolor="rgb(255,255,255)" color="#44C97C" border="1px solid #44C97C" type="button" height="54" radius="3" margin="0px" ><span class="css-ymwvow e4nu7ef1">취소</span></NftAddButton>
                    <NftAddButton backgroundcolor="#44C97C" color="rgb(255,255,255)" border="0px none" type="button" height="54" radius="3" margin="0px"><span class="css-ymwvow e4nu7ef1">등록</span></NftAddButton>
                    
                    
                
            
                    </div>

                </div>
                </div>


            </div>

        </div>
    );
}

export default AddGoods;

const NftAddButton = styled.button`
    display: flex;
    padding: 0px 10px;
    text-align: center;
    width: 200px;
    height: 54px;
    border-radius: 3px;
    line-height: 54px;
    font-weight: bold;

    background-color: ${props => props.backgroundcolor};
    color : ${props => props.color};
    border: ${props => props.border};
    margin-top: ${props => props.margin};
`;