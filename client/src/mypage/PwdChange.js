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

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    console.log("handleSubmit시작됨");

    axios
      .put(
        `http://3.38.210.200:8080/myPage/${memberInfoId}`,
        {
          password: newPwd,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        alert("수정되었습니다.");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const viewPwd = (e) => {
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
          // params: {
          //   memberId: 4,
          // },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        setNewPwd(e.target.value);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewPwd();
  }, []);

  return (
    <div>
      <ProfileInfo>비밀번호 변경</ProfileInfo>
      <RowLine></RowLine>

      <PwdInfo>기존 비밀번호 확인 </PwdInfo>
      <InfoInput
        placeholder="기존 비밀번호를 입력해주세요"
        type="password"
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <SaveButton>기존 비밀번호 확인하기</SaveButton>

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
            handleSubmit();
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
