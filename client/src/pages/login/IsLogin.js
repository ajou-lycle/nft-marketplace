// import React, { useEffect, useState } from 'react';
// import {useRecoilState } from 'recoil';
// import './Login.js';
// import '../Page1.js';
// import Login from './Login.js';
// import Header from '../../components/common/header.js';
// import { isLoginState } from '../../recoil/User.js';


// function IsLogin () {
//  // 로그인 상태 관리
//     const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    
//     useEffect(() => {
//     if(sessionStorage.getItem('user_token') === null){
//     // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
//         console.log('isLogin ?? :: ', isLogin);
//         setIsLogin(false);
//     } else {
//     // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
//     // 로그인 상태 변경
//         setIsLogin(true);
//         console.log('isLogin ?? :: ', isLogin)
//     }
//     })

//     return (
//         <div>

//        {/* { <Header isLogin={isLogin} /> } */}
//        </div>
//     )
// }
    

// export default IsLogin;