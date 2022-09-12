import React, { useEffect } from "react";
import {useRecoilState} from "recoil";
import {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {idState, isLogin} from "../../recoil/User";


import styled from "styled-components";


function Login() {

    handleChange = (e) => {
        const {AuthActions} = this.props;
        const {name, value} = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }

    const {userId, password} = this.props.form.toJS();
    const {handleChange} = this;

    const loginReal = () => {
        document.location.href('/contents');
    }
    
    const [isValid, setIsValid] = useState(false);

    const [bool, setboolean] = useRecoilState(isLogin);

    const naviagate=useNavigate();

    const [id,setId] = useRecoilState(idState);
    const onClickConfirm=()=> { 
        setboolean(true);
        Navigate('/')};


    
    return (
        <div className="login_whole">
            <div className="login_title">로그인</div>
            <div className="login_id_password_whole">
                <form>
                    <div className="login_id_password">
                        <div className="login_box">
                            <div className="login_id_enter">
                                <input data-testid="input-box" name="id" placeholder="아이디를 입력해주세요" type="text" class="css-1bkd15f e1uzxhvi2" value={id} onChange={(e)=>setId(e.target.value)}/>
                            </div>
                        </div>
                        <div className="login_box">
                            <div className="login_password_enter">
                                <input data-testid="input-box" name="password" placeholder="비밀번호를 입력해주세요" type="password" class="css-1bkd15f e1uzxhvi2" value=""/>
                            </div>
                        </div>
                    </div>
                    <div className="find_id_password">
                        <a className="find_id">아이디 찾기</a>
                        <span className = "find_icon"></span>
                        <a className ="find_id">비밀번호 찾기 </a>
                    </div>
                    <div className="login_button">
                    <Link to ="/">
                        <LoginButton onClick={onClickConfirm} backgroundcolor="rgb(95,0,128)" color="rgb(255,255,255)" border="0px none" type="button" height="54" radius="3" margin="0px"><span class="css-ymwvow e4nu7ef1">로그인</span></LoginButton>
                    </Link>
                    <LoginButton backgroundcolor="rgb(255,255,255)" color="rgb(95,0,128)" border="1px solid rgb(95,0,128)" type="button" height="54" radius="3" margin="10px" ><span class="css-ymwvow e4nu7ef1">회원가입</span></LoginButton>
                    </div>
                </form>
            </div>
        </div>
    )

    
}

const LoginButton = styled.button`
    display: block;
    padding: 0px 10px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 54px;
    border-radius: 3px;

    background-color: ${props => props.backgroundcolor};
    color : ${props => props.color};
    border: ${props => props.border};
    margin-top: ${props => props.margin};
`;




export default Login;

