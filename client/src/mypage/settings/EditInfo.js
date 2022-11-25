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
  Save,
} from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form } from "react-router-dom";

const EditInfo = (props) => {
  const memberInfoId = window.localStorage.getItem("memberId");
  const [userData, setUserData] = useState("");

  const [nickname, setNickname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [pwd, setPwd] = useState("");

  const fileInput = useRef(null);

  const viewUserData = () => {
    axios
      .get(`http://3.38.210.200:8080/myPage/${memberInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
        // params: {
        //   memberId: 4,
        // },
      })
      .then((res) => {
        console.log("res.data", res.data);
        setUserData(res.data);
        setNickname(res.data.nickname);
        setWalletAddress(res.data.walletAddress);
        setProfileImg(res.data.profileImg);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewUserData();
  }, []);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // const form = document.getElementById("form");
    // console.log("form:", form.checkValidity());
    // if (!form.checkValidity()) {
    //   form.classList.add("was-validated");
    //   return;
    // }
    console.log("handleSubmit시작됨");

    //객체 선언
    let formData = new FormData();
    //객체를 json type으로 파싱하여 Blob객체 생성, type에 json type 지정
    // formData.append(
    //   "nickname",
    //   new Blob([JSON.stringify(nickname)], { type: "application/json" })
    // );

    const value = {
      nickname: nickname,
      profileImg: profileImg,
    };
    formData.append("file", fileInput);
    formData.append("putMyPageDto", JSON.stringify(value));

    // const blob = new Blob([JSON.stringify(value)], {
    //   type: "application/json",
    // });

    // formData.append("data", blob);

    axios
      .put(
        `http://3.38.210.200:8080/myPage/${memberInfoId}`,
        {
          nickname: nickname,
          profileImg: profileImg,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        console.log("res:", JSON.stringify(res, null, 2));
        alert("수정되었습니다.");
      })
      .catch((err) => {
        console.log("Error", err);
        console.log("등록을 실패하였습니다.");
      });
  };

  const onImgChange = (e) => {
    e.preventDefault();

    //선택된 파일이 없으면 리턴
    console.log(e.target.files);
    if (!e.target.files || e.target.files.lenth === 0) return;

    const formData = new FormData();
    formData.append("profileImg", e.target.files[0], e.target.files[0].name);

    // formData.append('file', event.target.files[0]);
    // const response = await apliClient.post('', formData);
    // //response.data.location이 업로드한 파일의 url
    // if(e.target.files[0]) {
    //   //setFile(e.target.files[0]);
    // } else {
    //   setImage("");
    //   return;
    // }
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if(reader.readyState === 2) {
    //     setImage(reader.result);
    //   }
    // }
    // reader.readAsDataURL(e.target.files[0]);
  };
  const onUploadImage = useCallback((e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!fileInput.current) {
      return;
    }
    fileInput.current.click();
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
      {/* <form onSubmit={handleSubmit} noValidate id="form"> */}
      <ColumnLine />

      <MyPageContent className="mypage_content">
        <MyPageTitle>Your Profile</MyPageTitle>

        <div className="mypage_profile">
          <div className="mypage_profile_img">
            <img
              src="img/profile_image.jpg"
              className="profile_image"
              style={{ cursor: "pointer" }}
              onClick={() => {
                fileInput.current.click();
              }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={onUploadImage}
            />
            <button onClick={onUploadImageButtonClick}>
              이미지 업로드하기
            </button>

            <div style={{ display: "flex", justifyContent: "center" }}>
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
            </div>
          </div>

          <div className="mypage_profile_description">
            <ProfileInfo>User ID</ProfileInfo>
            <UserInfo>{userData.accountName}</UserInfo>
            {/* <InfoInput placeholder="" disabled /> */}

            <ProfileInfo>Nickname</ProfileInfo>
            {/* <UserInfo>{userData.nickname}</UserInfo> */}
            <InfoInput
              type="text"
              placeholder="Enter nickname"
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              required
              minLength="3"
              maxLength="10"
            />

            <ProfileInfo>Email Address</ProfileInfo>
            <UserInfo>{userData.email}</UserInfo>
            {/* <InfoInput placeholder="Email Address - 변경 불가능" disabled /> */}

            <ProfileInfo>Wallet Address</ProfileInfo>
            {/* <UserInfo>{userData.walletAddress}</UserInfo> */}
            <InfoInput
              type="text"
              placeholder="Enter walletAddress"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
              }}
              required
              minLength="3"
              maxLength="10"
            />
          </div>
        </div>

        <SaveButton onClick={handleSubmit}>수정</SaveButton>
      </MyPageContent>
      {/* </form> */}
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
  margin-left: 20px;
`;

export default EditInfo;
