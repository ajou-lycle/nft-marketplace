import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import { isLoginState, UserNickName } from "../../recoil/User";
import { Search } from "@material-ui/icons";
import axios from "axios";
import mainLogo from "../../assets/img/main_logo.png";

const Header = () => {
  // const isLogin=props.isLogin;
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [nickname, setNickname] = useRecoilState(UserNickName);
  useEffect(() => {
    if (sessionStorage.getItem("user_token") === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      setIsLogin(false);
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
    }
  });

  const onLogout = () => {
    sessionStorage.removeItem("user_token");
    document.location.href = "/mainPage";
  };

  const [searchWord, setSearchWord] = useState("");

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
    console.log(searchWord);
  };

  const onSubmit = async () => {
    window.location.href = "/search/" + searchWord;
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") onSubmit();
  };

  const onClickMyPage = () => {
    axios
      .post("http://3.38.210.200:8080/auth/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const memberInfoId = window.localStorage.getItem("memberId");

  return (
    <HeaderContainer>
      <div>
        <Link to="/mainPage" style={{ textDecoration: "none", color: "black" }}>
          <LogoImg src={mainLogo} />
        </Link>
      </div>

      {/* <div>
        <Link to="/" style={{textDecoration:"none", color:"black"}}>
          <HeaderText>Lamarket</HeaderText>
        </Link>
      </div> */}

      <div style={{ display: "flex" }}>
        <SearchInput
          type="search"
          placeholder="search items"
          onChange={onChangeSearch}
          value={searchWord}
          onKeyPress={onKeyPress}
        />
        <SearchButton
          type="button"
          onClick={() => {
            onSubmit();
          }}
        >
          <Search />
        </SearchButton>
      </div>

      <div>
        {isLogin ? (
          <UserNick>{nickname}님,안녕하세요!</UserNick>
        ) : (
          <Link to="/join" style={{ textDecoration: "none" }}>
            <UserButton>회원가입</UserButton>
          </Link>
        )}
      </div>

      <div>
        {isLogin ? (
          <UserButton onClick={onLogout}>로그아웃</UserButton>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <UserButton>로그인</UserButton>
          </Link>
        )}
      </div>

      {/* <div> <button type='button' onClick={onLogout}>로그아웃</button></div> */}

      <div>
        {isLogin ? (
          <Link
            to={{
              pathname: `/myPage/${memberInfoId}`,
              state: memberInfoId,
            }}
            style={{ textDecoration: "none" }}
          >
            <IconButton style={{ fontSize: "40px" }}>
              <AccountCircleOutlined style={{ fontSize: "inherit" }} />
            </IconButton>
          </Link>
        ) : (
          <div />
          // <Link to="/login" style={{ textDecoration: "none" }}>
          //   <UserButton>로그인</UserButton>
          // </Link>
        )}
      </div>

      {/* <div>
        <Link
          to={{
            pathname: `/myPage/${memberInfoId}`,
            state: memberInfoId,
          }}
          style={{ textDecoration: "none" }}
        >
          <IconButton style={{ fontSize: "40px" }}>
            <AccountCircleOutlined style={{ fontSize: "inherit" }} />
          </IconButton>
        </Link>
      </div> */}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  padding: 10px 50px;
  width: 90%;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 180px;
  margin-right: 30px;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-right: 30px;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  margin: 0 auto;
  border: 1px solid grey;
  border-radius: 15px;
  align-items: center;
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
  // margin-right:30px;
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
  margin-right: 20px;
`;

const UserNick = styled.div`
  width: 220px;
  padding: 10px 0px;
  border-radius: 6px;
  color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  text-align: center;
  margin-right: 20px;
`;

const SearchButton = styled.button`
  // border:1px solid rgb(46,204,113);
  background-color: transparent;
  cursor: pointer;
  height: 40px;
  // border-radius:6px;
  border: none;
  margin-right: 30px;
`;

export default Header;
