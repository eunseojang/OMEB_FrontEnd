import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchAuthToken = async () => {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       const code = urlParams.get("code");

  //       if (code) {
  //         try {
  //           const response = await axios.post(
  //             `${import.meta.env.VITE_TEST_URL}/api/auth/callback`,
  //             { code }
  //           );
  //           const { isLogin, accessToken, refreshToken } = response.data;

  //           if (isLogin) {
  //             document.cookie = `accessToken=${accessToken}; path=/`;
  //             document.cookie = `refreshToken=${refreshToken}; path=/`;
  //             navigate("/");
  //           } else {
  //             navigate("/signup"); // 회원가입 페이지로 이동
  //           }
  //         } catch (error) {
  //           console.error("Error fetching auth token", error);
  //         }
  //       }
  //     };

  //     fetchAuthToken();
  //   }, [navigate]);

  return (
    <div>
      <h2>Processing authentication...</h2>
    </div>
  );
};

export default AuthCallback;
