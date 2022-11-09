import React from "react";
import styled from "styled-components";

export default function PwdChange() {

  return(
    <div>
      <ProfileInfo>비밀번호 변경</ProfileInfo>
      <RowLine></RowLine>
      <PwdInfo>기존 비밀번호 확인 </PwdInfo>
        <InfoInput placeholder="기존 비밀번호를 입력해주세요" />

          <PwdInfo>새 비밀번호 입력 </PwdInfo>
          <InfoInput placeholder="새 비밀번호를 입력해주세요"  />

          <PwdInfo>새 비밀번호 재확인</PwdInfo>
          <InfoInput placeholder="새 비밀번호를 한 번 더 입력해주세요" /> 
          <SaveButton>Save</SaveButton>
    </div>
  );
}




const ProfileInfo = styled.div`
  font-size:18px;
  font-weight:600;
  letter-spacing:-0.4px;
  margin-bottom:15px;
`;

const InfoInput = styled.input`
  background-color:#ddd;
  border:none;
  border-radius:10px;
  width:440px;
  height:44px;
  margin-bottom:30px;
  padding: 0px 20px 0px 20px;
`;


const SaveButton = styled.div`
  width: 100px;
  padding: 10px 0px;
  border-radius: 6px;
  background-color: rgb(46, 204, 113);
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  cursor: pointer;
  float:right;
  margin-right:55px;
`;


const PwdInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing:-0.5px;
  margin-left:4px;
  margin-bottom:15px;

`;

const RowLine = styled.span`
  display:flex;
  width:100%;
  height:1.5px;
  background:#333;
  margin-bottom:30px;
`;