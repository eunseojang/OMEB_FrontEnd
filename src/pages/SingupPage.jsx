import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const navigate = useNavigate();

  const checkNicknameDuplication = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_TEST_URL
        }/api/v1/auth/check-nickname-duplication?nickname=${nickname}`
      );
      return response.data;
    } catch (err) {
      console.error("Error checking nickname duplication", err);
      setNicknameError("Error checking nickname duplication.");
      return false;
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setNicknameError("");

    const isNicknameAvailable = await checkNicknameDuplication();
    if (!isNicknameAvailable) {
      setNicknameError("This nickname is already taken.");
      setLoading(false);
      return;
    }

    try {
      const user = Cookies.get("user");
      console.log(user);
      const response = await axios.post(
        `${import.meta.env.VITE_TEST_URL}/api/v1/auth/sign-up`,
        { nickname },
        { withCredentials: true }
      );

      const data = response.data;

      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      Cookies.set("refreshToken", data.refreshToken, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      console.log("회원가입 성공");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "An error occurred during signup."
        );
      } else {
        setError("Network error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      {nicknameError && <p style={{ color: "red" }}>{nicknameError}</p>}
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupPage;
