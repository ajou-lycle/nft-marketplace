import styled from "styled-components";
import React, { useEffect } from "react";
import {useRecoilState} from "recoil";
import {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {idState, isLogin} from "../../recoil/User";
import './Menu.css';

function Menu() {
    const onClickConfirm=()=> { 
        setboolean(true);
        Navigate('/')};

    const [bool, setboolean] = useState(isLogin);

    const [click1, setClick1] = useState("content_bar_1_false");
    const [click2, setClick2] = useState("content_bar_1_false");

    const contentBar1 = () => {
        setClick1("content_bar_1_true");
        setClick2("content_bar_1_false");
    }
    const contentBar2 = () => {
        setClick1("content_bar_1_false");
        setClick2("content_bar_1_true");
    }

    return(
        <div className="menuButton">
            <Link to ="/market" style={{textDecoration:'none'}}>
                <MenuButton className={click1} onClick={contentBar1} border="0px none" type="button" height="54" radius="3" margin="0px">MARKET</MenuButton>
            </Link>
            <Link to ="/goods" style={{textDecoration:'none'}}>
                <MenuButton className={click2} onClick={contentBar2} border="0px none" type="button" height="54" radius="3" margin="0px"><span class="css-ymwvow e4nu7ef1">GOODS</span></MenuButton>
            </Link>
        </div>
    )
}

const MenuButton = styled.button`
    display: block;
    padding: 0px 10px;
    text-align: center;
    overflow: hidden;
    width: 550px;
    height: 70px;
    margin: 0px auto;
    cursor: pointer;
    

    background-color: ${props => props.backgroundcolor};
    color : ${props => props.color};
    border: ${props => props.border};
    margin-top: ${props => props.margin};
`;

export default Menu;