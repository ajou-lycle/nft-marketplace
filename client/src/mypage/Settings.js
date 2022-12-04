import React from "react";
import Header from "../components/common/header";
import MyPageMenu from "../pages/MyPageMenu";
import styled from "styled-components";
import { Save } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SettingPage() {
  const memberInfoId = window.localStorage.getItem("memberId");

  const [pwd, setPwd] = useState("");

  const checkPwd = (e) => {
    axios
      .post(
        `http://3.38.210.200:8080/myPage/check/${memberInfoId}`,
        {
          password: pwd,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data: ", res.data);

        if (res.data.result == false) {
          console.log("비밀번호가 일치하지 않습니다");
          alert("비밀번호가 일치하지 않습니다.");
        } else if (res.data.result == true) {
          console.log("비밀번호가 일치합니다.");
          alert("비밀번호가 일치합니다.");
          document.location.href = "/settings/edit";
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 0px",
        width: "1100px",
        margin: "0 auto",
      }}
    >
      <ColumnLine />

      <MyPageContent className="mypage_content">
        <MyPageTitle>Settings</MyPageTitle>

        <div className="mypage_wallet">
          <PwdInfo>
            수정 페이지로 가려면 기존 비밀번호 확인이 필요합니다.
          </PwdInfo>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <InfoInput
              placeholder="기존 비밀번호를 입력해주세요"
              type="password"
              value={pwd}
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            <SaveButton onClick={checkPwd}>기존 비밀번호 확인하기</SaveButton>
          </div>
          {/* <Link
            to={{
              pathname: `/settings/edit`,
            }}
            style={{ textDecoration: "none" }}
          >
            <EditButton>회원정보 수정</EditButton>
          </Link>
          <Link to="/settings/pwd" style={{ textDecoration: "none" }}>
            <EditButton>비밀번호 변경</EditButton>
          </Link> */}
        </div>
      </MyPageContent>
    </div>
  );
}

const MyPageContent = styled.div`
  margin-left: 10px;
  width: 100%;
  padding: 10px;
`;

const ColumnLine = styled.span`
  display: flex;
  width: 1px;
  height: 100%;
  background: #ddd;
`;

const SaveButton = styled.div`
  width: 200px;
  padding: 10px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 14px;
  height: 24px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  margin-left: 20px;
`;

const EditButton = styled.div`
  padding: 10px 0px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 15px;
  color: white;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  margin: 0px 10px 30px 0px;
`;

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  margin-left: 20px;
`;

const ProfileInfo = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.4px;
  margin-bottom: 20px;
`;

const PwdInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-left: 4px;
  margin-bottom: 15px;
`;

const InfoInput = styled.input`
  background-color: #ddd;
  border: none;
  border-radius: 10px;
  width: 440px;
  height: 44px;
  margin-bottom: 30px;
  padding: 0px 20px 0px 20px;
`;

const RowLine = styled.span`
  display: flex;
  width: 100%;
  height: 1.5px;
  background: #333;
  margin-bottom: 30px;
`;
