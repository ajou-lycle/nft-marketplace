import { pink } from "@material-ui/core/colors";
import React, { useCallback } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import {
  AccountCircle,
  AccountBalanceWallet,
  Favorite,
  Settings,
  CameraAlt,
  InsertPhoto,
} from "@material-ui/icons";
import "./ProfileSet.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileSet = () => {
  const memberInfoId = window.localStorage.getItem("memberId");
  const [userData, setUserData] = useState("");

  const fileInput = useRef(null);

  const viewUserData = () => {
    axios
      .get(`http://3.38.210.200:8080/myPage/${memberInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setUserData(res.data);
        console.log(res.data.profileImg);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewUserData();
  }, []);

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
        <MyPageTitle>Your Profile</MyPageTitle>

        <div className="mypage_profile">
          <div className="mypage_profile_img">
            <img
              src={userData.profileImg}
              className="profile_image"
              style={{ cursor: "pointer" }}
              onClick={() => {
                fileInput.current.click();
              }}
            />

            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <IconButton>
                <CameraAlt />
              </IconButton>
              <IconButton
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                <InsertPhoto />
              </IconButton>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                name="profile_img"
                onChange={onImgChange}
                ref={fileInput}
              />
            </div> */}
          </div>

          <div className="mypage_profile_description">
            <ProfileInfo>User ID</ProfileInfo>
            <UserInfo>{userData.accountName}</UserInfo>

            <ProfileInfo>Nickname</ProfileInfo>
            <UserInfo>{userData.nickname}</UserInfo>

            <ProfileInfo>Email Address</ProfileInfo>
            <UserInfo>{userData.email}</UserInfo>

            {/* <ProfileInfo>Wallet Address</ProfileInfo>
            <UserInfo>{userData.walletAddress}</UserInfo> */}
          </div>
        </div>
      </MyPageContent>
    </div>
  );
};

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

const UserInfo = styled.div`
  background-color: #ddd;
  border-radius: 10px;
  width: 440px;
  height: 44px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
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
  float: right;
  margin-right: 55px;
`;

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-left: 35px;
`;

export default ProfileSet;
