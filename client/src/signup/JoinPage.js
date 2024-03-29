import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./JoinPage.css";
import useEth from "../contexts/EthContext/useEth";
import styled from "styled-components";

const JoinPage = () => {
  const navigate = useNavigate();

  const { eth, setEthState } = useEth();

  const [userAddress, setUserAddress] =
    useState("지갑 주소를 가져올 수 없습니다.");

  const getUserAddress = () => {
    if (eth.accounts === null) {
      return;
    }
    if (!Array.isArray(eth.accounts)) {
      return;
    }
    setUserAddress(eth.accounts[0]);
  };

  useEffect(() => {
    const tryInit = async () => {
      getUserAddress();
    };
    tryInit();
  }, [eth]);

  //POST 회원가입 등록
  const register = () => {
    axios
      .post("http://3.38.210.200:8080/auth/sign-up", {
        accountName: id,
        password: pwd,
        nickname: name,
        email: email,
        walletAddress: userAddress,
      })
      .then((response) => {
        console.log("회원가입이 완료되었습니다.");
        alert("회원가입이 완료되었습니다.");
        console.log(response.data);
        alert(
          "보통 1시간 내로 6개의 토큰을 지급해드립니다.\n토큰을 이용해서 Goods에 있는 상품 추첨에 참여해보세요!\n자신의 토큰은 마이페이지 wallet에서 확인 가능합니다."
        );
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        // alert("회원가입을 실패하였습니다. 입력 형식을 다시 확인해주세요.");
        const errLength = error.response.data.errors.length;
        console.log(error.response.data.errors);
        for (let i = 0; i < errLength; i++) {
          alert(error.response.data.errors[i].message);
        }
      });
  };

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [walletValid, setWalletValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
    //영문자로 시작하는 영문자 또는 숫자 6~20자
    const regexId = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (regexId.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const checkId = (e) => {
    axios
      .post("http://3.38.210.200:8080/valid/accountName/exists", {
        accountName: id,
      })
      .then((res) => {
        console.log("res.data : ", res.data);
        if (res.data.result == true) {
          console.log("중복된 아이디 존재");
          alert("중복된 아이디가 존재합니다.");
          setIdValid(false);
        } else {
          console.log("사용 가능한 아이디");
          alert("사용 가능한 아이디입니다.");
          setIdValid(true);
        }
      })
      .catch((err) => {
        console.log("중복확인 실패 : ", err);
      });
  };

  const checkNickname = (e) => {
    axios
      .post("http://3.38.210.200:8080/valid/nickname/exists", {
        nickname: name,
      })
      .then((res) => {
        console.log("res.data :", res.data);
        if (res.data.result == true) {
          console.log("중복된 닉네임이 존재합니다");
          alert("중복된 닉네임이 존재합니다.");
          setNameValid(false);
        } else {
          console.log("사용 가능한 닉네임");
          alert("사용 가능한 닉네임입니다.");
          setNameValid(true);
        }
      })
      .catch((err) => {
        console.log("중복확인 실패:", err);
      });
  };

  const checkWallet = (e) => {
    axios
      .post("http://3.38.210.200:8080/valid/walletAddress/exists", {
        walletAddress: userAddress,
      })
      .then((res) => {
        if (userAddress == "지갑 주소를 가져올 수 없습니다.") {
          alert("지갑 주소를 가져와주세요.");
        } else if (res.data.result == true) {
          console.log("중복된 지갑주소 존재");
          alert("중복된 지갑주소가 존재합니다.");
          setWalletValid(false);
        } else {
          console.log("사용가능한 지갑주소");
          alert("사용가능한 지갑주소입니다.");
          setWalletValid(true);
        }
      })
      .catch((err) => {
        console.log("중복확인 실패");
      });
  };

  const sendEmail = (e) => {
    axios
      .post("http://3.38.210.200:8080/valid/email/send", {
        email: email,
      })
      .then((res) => {
        if (res.data.result == false) {
          alert("중복된 이메일이 존재합니다. 다른 이메일을 입력해주세요.");
        } else {
          console.log("이메일 인증 메일이 전송되었습니다.");
          alert(
            "이메일 인증 메일이 전송되었습니다. 메일함으로 가서 확인해주세요."
          );
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const configEmail = (e) => {
    axios
      .post("http://3.38.210.200:8080/valid/email/check", {
        email: email,
      })
      .then((res) => {
        if (res.data.result == true) {
          console.log("인증 완료");
          alert("이메일 인증이 완료되었습니다.");
          setEmailValid(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setEmailValid(false);
      });
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
    //비밀번호는 8~16자 영문 대소문자, 숫자, 특수문자를 사용해야 한다.
    // const regexPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    const regexPwd =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,16}$/;

    if (regexPwd.test(pwd)) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  };

  const handleName = (e) => {
    const regexNickname = /^[ㄱ-ㅎ가-힣a-z0-9-_]{4,10}$/;
    setName(e.target.value);
    //닉네임은 특수문자를 제외한 4~10자리
    if (regexNickname.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);

    const regexEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (regexEmail.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // const handleWallet = (e) => {
  //   setWallet(e.target.value);
  //   if (e.target.value.length > 2) {
  //     setWalletValid(true);
  //   } else {
  //     setWalletValid(false);
  //   }
  // };

  useEffect(() => {
    if ((idValid && pwdValid && nameValid && emailValid, walletValid)) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwdValid, nameValid, emailValid, walletValid]);

  return (
    <div className="joinPage">
      <div className="join_title">회원가입</div>
      <div className="join_content">
        <div className="pg_sub">
          <span className="pg_sub_star">*</span>
          필수입력사항
        </div>

        <div className="join_write">
          <div className="join_write_content">
            <div className="join_write_id">
              <label className="id_label">
                아이디
                <span className="pg_sub_star">*</span>
              </label>
            </div>
            <div className="join_write_id_input">
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                className="id_input"
                value={id}
                onChange={handleId}
              />
              <div className="errorMessageWrap">
                {!idValid && id.length > 0 && (
                  <div>아이디는 6~20자 영문자 혹은 숫자이어야 합니다.</div>
                )}
              </div>
              {/* <div className="errorMessageWrap">
                {!idValid && id.length > 0 && <div>! 중복된 아이디입니다.</div>}
              </div> */}
            </div>
            <div className="join_write_id_config">
              <button
                className="id_config_btn"
                style={{ cursor: "pointer" }}
                onClick={checkId}
              >
                <span className="id_config_btn_text">중복확인</span>
              </button>
            </div>
          </div>

          <div className="join_write_content">
            <div className="join_write_id">
              <label className="id_label">
                비밀번호
                <span className="pg_sub_star">*</span>
              </label>
            </div>
            <div className="join_write_id_input">
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="id_input"
                value={pwd}
                onChange={handlePwd}
                maxLength="16"
              />
              <div className="errorMessageWrap">
                {!pwdValid && pwdValid > 0 && (
                  <div>
                    비밀번호는 8~16자 영문 대소문자, 숫자, 특수문자를 사용해야
                    합니다.
                  </div>
                )}
              </div>
            </div>
            <div className="join_write_id_config"></div>
          </div>

          <div className="join_write_content">
            <div className="join_write_id">
              <label className="id_label">
                닉네임
                <span className="pg_sub_star">*</span>
              </label>
            </div>
            <div className="join_write_id_input">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="id_input"
                value={name}
                onChange={handleName}
              />
              <div className="errorMessageWrap">
                {!nameValid && name.length > 0 && (
                  <div>닉네임은 특수문자를 제외한 4~10자리여야 합니다.</div>
                )}
              </div>
            </div>
            <div className="join_write_id_config">
              <button
                className="id_config_btn"
                style={{ cursor: "pointer" }}
                onClick={checkNickname}
              >
                <span className="id_config_btn_text">중복확인</span>
              </button>
            </div>
          </div>

          <div className="join_write_content">
            <div className="join_write_id">
              <label className="id_label">
                이메일
                <span className="pg_sub_star">*</span>
              </label>
            </div>
            <div className="join_write_id_input">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="id_input"
                value={email}
                onChange={handleEmail}
              />
              <div className="errorMessageWrap">
                {!emailValid && email.length > 0 && (
                  <div>이메일 형식을 지켜주세요</div>
                )}
              </div>
            </div>
            <div className="join_write_id_config">
              <button
                className="id_config_btn"
                style={{ cursor: "pointer" }}
                onClick={sendEmail}
              >
                <span className="id_config_btn_text">인증메일전송</span>
              </button>
            </div>
            <div className="join_write_id_config">
              <button
                className="id_config_btn"
                style={{ cursor: "pointer" }}
                onClick={configEmail}
              >
                <span className="id_config_btn_text">인증확인</span>
              </button>
            </div>
          </div>

          <div className="join_write_content">
            <div className="join_write_id">
              <label className="id_label">
                지갑 주소
                <span className="pg_sub_star">*</span>
              </label>
            </div>
            <div className="join_write_id_input">
              {/* <UserInfo>{userAddress}</UserInfo> */}
              <input
                type="text"
                placeholder="지갑 주소를 입력해주세요"
                className="id_input"
                value={userAddress}
              />
              <div className="errorMessageWrap">
                {!walletValid && wallet.length > 0 && (
                  <div>지갑 주소 형식을 지켜주세요</div>
                )}
              </div>
            </div>
            <div className="join_write_id_config">
              <button
                className="id_config_btn"
                style={{ cursor: "pointer" }}
                onClick={checkWallet}
              >
                <span className="id_config_btn_text">중복확인</span>
              </button>
            </div>
          </div>
        </div>

        <div className="join_finish">
          <button
            className="join_btn"
            type="submit"
            disabled={notAllow}
            onClick={() => {
              if (userAddress == "지갑 주소를 가져올 수 없습니다.") {
                alert("지갑 주소를 가져와주세요.");
              } else {
                register();
              }
            }}
          >
            <span className="join_btn_text">가입하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const UserInfo = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  width: 92%;
  height: 41px;
  margin-bottom: 30px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  padding: 0px 11px 1px 15px;
  font-size: 12px;
`;

export default JoinPage;
