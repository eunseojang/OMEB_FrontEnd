import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SingupPage.css';

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
      setNicknameError("이미 중복된 닉네임이 존재합니다.");
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
        expires: 1 / 48, // 30 minutes
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      Cookies.set("refreshToken", data.refreshToken, {
        expires: 1 / 48, // 30 minutes
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "회원가입할 수 없습니다.");
      } else {
        setError("Network error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signup_back">

      <div className="signup">
        <h4>시작하기</h4>

        <div>
          <input
            className="nicknameInput"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {nicknameError && <p style={{ color: "red" }}>{nicknameError}</p>}
        </div>
        <button
          className="nicknameBtn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

    </div>
  );
};

export default SignupPage;
