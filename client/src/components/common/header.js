import React from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";

export default function Header(props) {

  const isLogin=props.isLogin;

  const onLogout = () => {
    sessionStorage.removeItem('user_token');
    document.location.href = '/';

}


  return(
    <div style={{
      display:"flex",
      padding:"10px 50px",
      width:"1000px",
      alignItems:"center",
      margin:"0 auto",
      border:"2px solid gray",
    }}>
      <div>
        <LogoImg src="img/lamarket_logo.png" />
      </div>

      <div>
        <HeaderText>Lamarket</HeaderText>
      </div>

      <div>
        <SearchInput type='text' placeholder="search items"></SearchInput>
      </div>

      

      
      <div>
        <Link to="/join" style={{textDecoration:"none"}}>
          <UserButton>
            회원가입
          </UserButton>
        </Link>
      </div>

      <div>
        <Link to="/login" style={{textDecoration:"none"}}>
          <UserButton>
            로그인
          </UserButton>
        </Link>
      </div>

      <div> <button type='button' onClick={onLogout}>로그아웃</button></div>
  



      <div>
        <Link to="" style={{textDecoration:"none"}}>
          <IconButton style={{fontSize:"40px"}}>
            <AccountCircleOutlined  style={{fontSize:"inherit"}}/>
          </IconButton>
        </Link>
      </div>
      
    </div>
  );
}

const LogoImg = styled.img`
  width:60px;
  margin-right:30px;
`;

const HeaderText = styled.div`
  font-size:30px;
  font-weight:700;
  margin-right:30px;
`;

const SearchInput = styled.input`
  width:420px;
  height: 40px;
  margin:0 auto;
  border: 1px solid grey;
  border-radius:15px;
  align-items:center;
  font-size:20px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right:30px;
`;

const UserButton = styled.div`
  width: 100px;
  padding: 10px 0px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  margin-right:20px;
`;