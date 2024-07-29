import React from "react"
import { useState } from "react"
import "./LoginPage.css"
import google_logo from "../assets/logo/google_logo.png"
import naver_logo from "../assets/logo/naver_logo.png"
import kakao_logo from "../assets/logo/kakao_logo.png"


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="back">
      <div className="login">
        <h4>일심동책</h4>
        <form>
          <div className="text_area">
            <input
              type='text'
              id='email'
              name='email'
              defaultValue={email} 
              className='text_input'
            />
          </div>
          <div className="text_area">
            <input
              type='password'
              id='password'
              name='password'
              defaultValue={password}
              className='text_input'
            />
          </div>
          <input
            type='submit'
            value= "로그인"
            className='btn'
          />
        </form>

        <div className="social_login">
          <p>SNS 간편 로그인</p>
          <div className="social">
            <img src={kakao_logo} alt="kakao_logo" />
          </div>
          <div className="social">
            <img src={naver_logo} alt="naver_logo" />
          </div>
          <div className="social">
            <img src={google_logo} alt="google_logo" />
            <div className="circle"></div>
          </div>
        </div>
        
        <div className="sub">
          <a className='link' href='/'>회원가입</a>
          <a className='link' href='/'>비밀번호 찾기</a>
          <a className='link' href='/'>아이디 찾기</a>
        </div>
        
      </div>
    </div>

  );
};

export default LoginPage;