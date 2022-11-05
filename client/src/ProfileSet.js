import { pink } from "@material-ui/core/colors";
import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle, AccountBalanceWallet, Favorite, Settings, CameraAlt, InsertPhoto } from "@material-ui/icons";
import './ProfileSet.css';

export default function ProfileSet() {



  return(
    <div style={{
      display:"flex",
      padding:"10px 0px",
      width:"1100px",
      margin:"0 auto",
    }}>


      <ColumnLine />

      <MyPageContent className="mypage_content">
        <MyPageTitle>Profile Settings</MyPageTitle>

        <div className="mypage_profile">

          <div className="mypage_profile_img">
            <img src="img/profile_image.jpg" className="profile_image"/>
            <div style={{display:"flex", justifyContent:"center"}}>
              <IconButton>
                <CameraAlt />
              </IconButton>
              <IconButton>
                <InsertPhoto />         
              </IconButton>
            </div>
          </div>

          <div className="mypage_profile_description">

            <ProfileInfo>User ID</ProfileInfo>
            <InfoInput placeholder="User ID - 변경 불가능" disabled />

            <ProfileInfo>Nickname</ProfileInfo>
            <InfoInput placeholder="Nickname - 변경 불가능" disabled />

            <ProfileInfo>Email Address</ProfileInfo>
            <InfoInput placeholder="Email Address - 변경 불가능" disabled />

            <ProfileInfo>Wallet Address</ProfileInfo>
            <InfoInput placeholder="Wallet Address - 변경 불가능" disabled />

          </div>
        </div>

        <SaveButton>Save</SaveButton>

      </MyPageContent>




    </div>
  );
}



const MyPageContent = styled.div`
  margin-left:10px;
  width: 100%;
  padding: 10px;
`;



const ColumnLine = styled.span`
  display:flex;
  width:1px;
  height:100%;
  background:#ddd;
`;

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

const MyPageTitle = styled.div`
  font-size:30px;
  font-weight:600;
  margin-bottom:15px;
  margin-left:20px;
`;