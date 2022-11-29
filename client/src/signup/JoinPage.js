import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./JoinPage.css";

const JoinPage = () => {
  const navigate = useNavigate();

  //POST 회원가입 등록
  const register = () => {
    axios
      .post("http://3.38.210.200:8080/auth/sign-up", {
        accountName: id,
        password: pwd,
        nickname: name,
        email: email,
        walletAddress: wallet,
      })
      .then((response) => {
        console.log("회원가입이 완료되었습니다.");
        alert("회원가입이 완료되었습니다.");
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
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
          console.log("사용가능한 아이디");
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
          console.log("중복된 닉네임 존재");
          alert("중복된 닉네임이 존재합니다.");
          setNameValid(false);
        } else {
          console.log("사용가능한 닉네임");
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
        walletAddress: wallet,
      })
      .then((res) => {
        if (res.data.result == true) {
          console.log("중복된 지갑주소 존재");
          alert("중복된 지갑주소가 존재합니다.");
          setWalletValid(false);
        } else {
          console.log("사용가능한 지갑주소");
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
        console.log("이메일 인증 메일이 전송되었습니다.");
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
          alert("이메일 인증 완료");
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
    const regexNickname = /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/;
    setName(e.target.value);
    //닉네임은 특수문자를 제외한 2~10자리
    if (regexNickname.test(name)) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regexEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (regexEmail.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleWallet = (e) => {
    setWallet(e.target.value);
    if (e.target.value.length > 2) {
      setWalletValid(true);
    } else {
      setWalletValid(false);
    }
  };

  useEffect(() => {
    if (idValid && pwdValid && nameValid && emailValid && walletValid) {
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
                  <div>6자 이상의 영문 혹은 영문과 숫자를 조합</div>
                )}
              </div>
              <div className="errorMessageWrap">
                {!idValid && id.length > 0 && <div>! 중복된 아이디입니다.</div>}
              </div>
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
                {!pwdValid && pwd.length > 0 && (
                  <div>비밀번호 정규표현식을 지켜주세요</div>
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
                  <div>4글자 이상 10자 이하</div>
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
              <input
                type="text"
                placeholder="지갑 주소를 입력해주세요"
                className="id_input"
                value={wallet}
                onChange={handleWallet}
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
              register();
            }}
          >
            <span className="join_btn_text">가입하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
