import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import {
  address,
  idState,
  isLogin,
  serverAddress,
  UserNickName,
} from "../../recoil/User";
import styled from "styled-components";
import "./Login.css";
import "../../recoil/User.js";
import mainLogo from "../../assets/img/main_logo.png";

function Login() {
  // const loginReal = () => {
  //     document.location.href('/contents');
  // }

  // const [isValid, setIsValid] = useState(false);

  // const naviagate=useNavigate();
  // const email = document.getElementById("accountName");
  // const password = document.getElementById('pw');
  const [address, setAddress] = useRecoilState(serverAddress);
  const [nickname, setNickname] = useRecoilState(UserNickName);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key == "Enter") {
      onClickConfirm();
    }
  };

  const onClickConfirm = () => {
    console.log("click login");
    axios
      .post(
        `http://${address}:8080/auth/login`,
        {
          accountName: inputId,
          password: inputPw,
        },
        { withCredentials: true }
      )

      .then((res) => {
        console.log("res.data", res.data);
        console.log("res.data.accessToken :: ", res.data.accessToken);
        localStorage.setItem("memberId", res.data.memberId);
        console.log("멤버아이디, ", res.data.memberId);
        if (res.data.accessToken === "f") {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.accessToken);
          alert("입력하신 정보가 일치하지 않습니다.");
        } else {
          setNickname(res.data.nickname);
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_token", res.data.accessToken);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mainPage";
      })
      .catch((err) => {
        alert("입력하신 정보가 옳지 않습니다!");
      });
  };

  return (
    <div className="login_whole">
      <div className="loginpage_header">
        {" "}
        <Link
          to="/mainPage"
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LogoImg src={mainLogo} style={{ width: "200px" }} />
        </Link>{" "}
      </div>
      <div className="login_title">로그인</div>
      <div className="login_id_password_whole">
        <form>
          <div className="login_id_password">
            <div className="login_box">
              <div className="login_id_enter">
                <label htmlFor="input_id"></label>
                <input
                  name="input_id"
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  id="accountName"
                  class="css-1bkd15f e1uzxhvi2"
                  value={inputId}
                  onChange={handleInputId}
                />
              </div>
            </div>
            <div className="login_box">
              <div className="login_password_enter">
                <input
                  name="input_pw"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  id="pw"
                  class="css-1bkd15f e1uzxhvi2"
                  value={inputPw}
                  onChange={handleInputPw}
                  onKeyPress={handleOnKeyPress}
                />
              </div>
            </div>
          </div>
          <div className="login_button">
            <LoginButton
              onClick={onClickConfirm}
              backgroundcolor="#44C97C"
              color="rgb(255,255,255)"
              border="0px none"
              type="button"
              height="54"
              radius="3"
              margin="0px"
            >
              <span class="css-ymwvow e4nu7ef1">로그인</span>
            </LoginButton>

            <Link to="/join" style={{ textDecoration: "none" }}>
              <LoginButton
                backgroundcolor="rgb(255,255,255)"
                color="#44C97C"
                border="1px solid #44C97C"
                type="button"
                height="54"
                radius="3"
                margin="10px"
              >
                <span class="css-ymwvow e4nu7ef1">회원가입</span>
              </LoginButton>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const LoginButton = styled.button`
  display: block;
  padding: 0px 10px;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  cursor: pointer;

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  margin-top: ${(props) => props.margin};
`;
const LogoImg = styled.img`
  width: 180px;
`;
export default Login;
