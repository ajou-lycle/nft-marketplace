import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { config } from "process";

export default function PwdChange() {
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [configPwd, setConfigPwd] = useState("");

  const memberInfoId = window.localStorage.getItem("memberId");

  const pwdSubmit = async (e) => {
    console.log("pwdSubmit시작됨");

    let pwdData = new FormData();
    //객체를 json type으로 파싱하여 Blob객체 생성, type에 json type 지정

    let pwdValue = {
      password: newPwd,
    };

    console.log(pwdValue);

    pwdData.append(
      "putMyPageDto",
      new Blob([JSON.stringify(pwdValue)], { type: "application/json" })
    );

    console.log(pwdData.get("putMyPageDto"));

    await axios
      .put(`http://3.38.210.200:8080/myPage/${memberInfoId}`, pwdData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        alert("비밀번호가 변경되었습니다.");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const checkPwd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
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
        console.log("checkPwd시작");
        console.log("res.data", res.data);
        console.log("res.data.result", res.data.result);

        if (res.data.result == false) {
          console.log("불일치합니다");
        } else {
          console.log("일치합니다.");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // useEffect(() => {
  //   checkPwd();
  // }, []);

  return (
    <div>
      <ProfileInfo>비밀번호 변경</ProfileInfo>
      <RowLine></RowLine>

      <PwdInfo>기존 비밀번호 확인</PwdInfo>
      <InfoInput
        placeholder="기존 비밀번호를 입력해주세요"
        type="password"
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
        defaultValue="Initial value"
      />
      <SaveButton
        onClick={(e) => {
          checkPwd();
        }}
      >
        기존 비밀번호 확인하기
      </SaveButton>

      <PwdInfo>새 비밀번호 입력 </PwdInfo>
      <InfoInput
        type="password"
        placeholder="새 비밀번호를 입력해주세요"
        id="password"
        value={newPwd}
        onChange={(e) => {
          setNewPwd(e.target.value);
        }}
        required
        minLength="8"
        maxLength="16"
      />
      <PwdInfo>새 비밀번호 재확인</PwdInfo>
      <InfoInput
        type="password"
        placeholder="새 비밀번호를 한 번 더 입력해주세요"
        id="password"
        value={configPwd}
        onChange={(e) => {
          setConfigPwd(e.target.value);
        }}
        required
        minLength="8"
        maxLength="16"
      />
      <SaveButton
        onClick={(e) => {
          if (newPwd == configPwd) {
            pwdSubmit();
          } else {
            alert("새 비밀번호가 일치하지 않습니다.");
          }
        }}
      >
        비밀번호 변경하기
      </SaveButton>
    </div>
  );
}

const ProfileInfo = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.4px;
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

const SaveButton = styled.div`
  /* width: 100px; */
  padding: 10px 0px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  float: right;
  margin-right: 55px;
`;

const PwdInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-left: 4px;
  margin-bottom: 15px;
`;

const RowLine = styled.span`
  display: flex;
  width: 100%;
  height: 1.5px;
  background: #333;
  margin-bottom: 30px;
`;
