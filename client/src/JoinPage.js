import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import './JoinPage.css';
import { Navigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';

const JoinPage = () => {

  //GET 조회
  // useEffect(() => {
  //   axios.get('http://localhost:8080/member/test').then((res) => {
  //     console.log(res.data);
  //   }).catch((err) => {
  //     console.log("GET : 실패");
  //   });
  // }, []);

  //POST 회원가입 등록
  const register = () => {
    axios.post('http://localhost:8080/auth/sign-up', {
      accountName : id,
      password : pwd,
      nickname : name,
      email : email,
      walletAddress : wallet,
    }).then((response) => {
      console.log('회원가입이 완료되었습니다.');
      alert('회원가입이 완료되었습니다.');
      console.log(response.data);
      
      Navigate("/login");
    }).catch((error) => {
      console.log('An error occurred:', error.response);
    });
  }

  

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
    const regexId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,10}$/;
    if(regexId.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }

  const checkId = (e) => { 
    axios.post('http://localhost:8080/valid/accountName/exists', {
      accountName : id,
    }).then((res) => {
      console.log("res.data : ", res.data);
      if(res.data.result == true) {
        console.log("중복된 아이디 존재");
        alert("중복된 아이디가 존재합니다.");
      } else {
        console.log("사용가능한 아이디");
      }
    }).catch((err) => {
      console.log("중복확인 실패 : ", err);
    });
  }

  const checkNickname = (e) => {
    axios.post('http://localhost:8080/valid/nickname/exists', {
      nickname : name,
    }).then((res) => {
      console.log("res.data :", res.data);
      if(res.data.result == true) {
        console.log("중복된 닉네임 존재");
        alert("중복된 닉네임이 존재합니다.");
      } else {
        console.log("사용가능한 닉네임");
      }
    }).catch((err) => {
      console.log("중복확인 실패:", err);
    });
  }


  const checkWallet = (e) => {
    axios.post('http://localhost:8080/valid/walletAddress/exists', {
      walletAddress : wallet,
    }).then((res) => {
      if(res.data.result==true) {
        console.log("중복된 지갑주소 존재");
        alert("중복된 지갑주소가 존재합니다.");
      } else {
        console.log("사용가능한 지갑주소");
      }
    }).catch((err) => {
      console.log("중복확인 실패");
    });
  }

  const sendEmail = (e) => {
    axios.post('http://localhost:8080/valid/email/send', {
      email : email,
    }).then((res) => {
      console.log("이메일 인증 메일이 전송되었습니다.");
    }).catch((err) => {
      console.log("error:", err);
    });
  }

  

  const configEmail = (e) => {
    axios.post('http://localhost:8080/valid/email/check', {
      email : email,
    }).then((res) => {
      if(res.data.result==true) {
        console.log("인증 완료");
        alert("이메일 인증 완료");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handlePwd = (e) => {
    setPwd(e.target.value);

    const regexPwd = /^[A-Za-z0-9]{9,20}$/;
    if(regexPwd.test(pwd)) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  }

  const handleName = (e) => {
    setName(e.target.value);
    if(e.target.value.length < 2 || e.target.value.length > 10) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regexEmail = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if(regexEmail.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }

  const handleWallet = (e) => {
    setWallet(e.target.value);
    if(e.target.value.length>2) {
      setWalletValid(true);
    } else {
      setWalletValid(false);
    }
    
  }

  useEffect(() => {
    if(idValid&&pwdValid&&nameValid&&emailValid&&walletValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwdValid, nameValid, emailValid, walletValid]);

  return(
    <div className="joinPage">
      <div className="join_title">
        회원가입
      </div>
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
              <input type="text" placeholder="아이디를 입력해주세요" className="id_input" value={id} onChange={handleId} />
              <div className="errorMessageWrap">
              {
                !idValid && id.length > 0 && (
                  <div>6자 이상의 영문 혹은 영문과 숫자를 조합</div>
                )
              }
              </div>
            </div>
            <div className="join_write_id_config">
              <button className="id_config_btn" style={{cursor:"pointer"}} onClick={checkId}>
                <span className="id_config_btn_text">
                  중복확인
                </span>
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
                <input type="password" placeholder="비밀번호를 입력해주세요" className="id_input" value={pwd} onChange={handlePwd} maxLength="16" />
                <div className="errorMessageWrap">
                {
                  !pwdValid && pwd.length > 0 && (
                    <div>비밀번호 정규표현식을 지켜주세요</div>
                  )
                }
                </div>
              </div>
              <div className="join_write_id_config">
                
              </div>
          </div>

          <div className="join_write_content">
            <div className="join_write_id">
                <label className="id_label">
                  닉네임
                  <span className="pg_sub_star">*</span>
                </label>
              </div>
              <div className="join_write_id_input">
                <input type="text" placeholder="닉네임을 입력해주세요" className="id_input" value={name} onChange={handleName} />
                <div className="errorMessageWrap">
                {
                  !nameValid && name.length > 0 && (
                    <div>닉네임 표현식을 지켜주세요</div>
                  )
                }
                </div>
              </div>
              <div className="join_write_id_config">
              <button className="id_config_btn" style={{cursor:"pointer"}} onClick={checkNickname}>
                <span className="id_config_btn_text">
                  중복확인
                </span>
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
                <input type="text" placeholder="이메일을 입력해주세요" className="id_input" value={email} onChange={handleEmail} />
                <div className="errorMessageWrap">
                {
                  !emailValid && email.length > 0 && (
                    <div>이메일 형식을 지켜주세요</div>
                  )
                }
              </div>
              </div>
              <div className="join_write_id_config">
              <button className="id_config_btn" style={{cursor:"pointer"}} onClick={sendEmail}>
                <span className="id_config_btn_text">
                  인증메일전송
                </span>
              </button>
            </div>
            <div className="join_write_id_config">
              <button className="id_config_btn" style={{cursor:"pointer"}} onClick={configEmail}>
                <span className="id_config_btn_text">
                  인증확인
                </span>
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
                <input type="text" placeholder="지갑 주소를 입력해주세요" className="id_input" value={wallet} onChange={handleWallet} />
                <div className="errorMessageWrap">
                {
                  !walletValid && wallet.length > 0 && (
                    <div>지갑 주소 형식을 지켜주세요</div>
                  )
                }
                </div>
              </div>
              <div className="join_write_id_config">
              <button className="id_config_btn" style={{cursor:"pointer"}} onClick={checkWallet}>
                <span className="id_config_btn_text">
                  중복확인
                </span>
              </button>
            </div>
          </div>
        </div>


        <div className="join_finish">
          <button className="join_btn" type="submit" disabled={notAllow} onClick={ () => {
            register();
          }}>
            <span className="join_btn_text">
              가입하기
            </span>
          </button>
        </div>
      </div>

      


    </div>
  );



}



export default JoinPage;