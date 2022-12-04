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
import { useSetRecoilState } from "recoil";
import { UserNickName } from "../../recoil/User";

const EditInfo = (props) => {
  const setLocalNickName = useSetRecoilState(UserNickName);
  const memberInfoId = window.localStorage.getItem("memberId");
  const [userData, setUserData] = useState("");

  const [nickname, setNickname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [pwd, setPwd] = useState("");
  const [prevPwd, setPrevPwd] = useState(props);
  const [newPwd, setNewPwd] = useState("");
  const [configPwd, setConfigPwd] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [localImageURL, setLocalImageURL] = useState("");

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    setLocalImageURL(url);
    return new File([data], filename, metadata);
  };

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
        setNickname(res.data.nickname);
        setWalletAddress(res.data.walletAddress);
        setProfileImg(res.data.profileImg);

        convertURLtoFile(res.data.profileImg).then((file) => {
          setImageFile(file);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewUserData();
  }, []);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    console.log("handleSubmit시작됨");

    //객체 선언
    let formData = new FormData();
    //객체를 json type으로 파싱하여 Blob객체 생성, type에 json type 지정

    let userValue = {
      nickname: nickname,
      profileImg: profileImg,
      walletAddress: walletAddress,
      password: newPwd,
    };

    console.log(userValue);

    formData.append("file", imageFile);
    formData.append(
      "putMyPageDto",
      new Blob([JSON.stringify(userValue)], { type: "application/json" })
    );

    console.log(formData.get("file"));
    console.log(formData.get("putMyPageDto"));

    await axios
      .put(`http://3.38.210.200:8080/myPage/${memberInfoId}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        // console.log("res:", JSON.stringify(res, null, 2));
        alert("수정되었습니다.");
        setLocalNickName(nickname);
      })
      .catch((err) => {
        console.log("Error", err);
        console.log("등록을 실패하였습니다.");
      });
  };

  const onUploadImage = (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setLocalImageURL(URL.createObjectURL(e.target.files[0]));
  };

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
        console.log("res.data : ", res.data);

        if (res.data.result == false) {
          console.log("불일치합니다");
          alert("비밀번호가 불일치합니다.");
        } else if (res.data.result == true) {
          console.log("일치합니다.");
          alert("기존 비밀번호가 일치합니다.");
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
        <MyPageTitle>Your Profile</MyPageTitle>

        <div className="mypage_profile">
          <div className="mypage_profile_img">
            {localImageURL ? (
              <img
                src={localImageURL}
                className="profile_image"
                style={{ cursor: "pointer" }}
              />
            ) : (
              <div className="profile_image"></div>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="profileImage"
              onChange={onUploadImage}
            />
            <div style={{ marginTop: "10px" }}></div>
            <label htmlFor="profileImage">Change Profile</label>

            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <IconButton>
                <CameraAlt />
              </IconButton>
              <IconButton>
                <InsertPhoto />
              </IconButton>
            </div> */}
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
            {/* 
            <ProfileInfo>Wallet Address</ProfileInfo>
            <UserInfo>{userData.walletAddress}</UserInfo> */}
          </div>
        </div>
        <EditButton onClick={handleSubmit}>수정</EditButton>

        <div style={{ marginTop: "80px", padding: "10px", marginLeft: "20px" }}>
          <ProfileInfo>비밀번호 변경</ProfileInfo>
          <RowLine></RowLine>

          <PwdInfo>기존 비밀번호 확인 </PwdInfo>
          <div style={{ display: "flex" }}>
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
          <div style={{ display: "flex" }}>
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
                  console.log("error");
                }
                // } else if (newPwd !== configPwd && pwd == prevPwd) {
                //   alert("새 비밀번호가 일치하지 않습니다.");
                //   console.log("newPwd != configPwd");
                // } else if (newPwd == configPwd && pwd != prevPwd) {
                //   alert("기존 비밀번호가 일치하지 않습니다.");
                // } else {
                //   alert("기존 비밀번호가 일치하지 않습니다.");
                //   console.log("마지막else");
                // }
              }}
            >
              비밀번호 변경하기
            </SaveButton>
          </div>
        </div>
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

const EditButton = styled.div`
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
  margin-bottom: 50px;
`;

const SaveButton = styled.div`
  width: 150px;
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

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-left: 35px;
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

export default EditInfo;
