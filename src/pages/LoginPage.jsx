import google_logo from "../assets/logo/google_logo.png";
import naver_logo from "../assets/logo/naver_logo.png";
import kakao_logo from "../assets/logo/kakao_logo.png";
import "./LoginPage.css";

const LoginPage = () => {
  const handleLogin = (provider) => {
    const redirectUri = "http://localhost:3000//auth/callback"; // Your app's redirect URI
    const authUrl = `${
      import.meta.env.VITE_TEST_URL
    }/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    window.location.href = authUrl;
  };

  return (
    <div className="login_back">
      <div className="login">
        <h4>로그인</h4>

        <div className="social_login">
          <div className="google" onClick={() => handleLogin("google")}>
            <img src={google_logo} alt="google_logo" />
            <p>구글로 시작하기</p>
          </div>
          <div className="naver" onClick={() => handleLogin("naver")}>
            <img src={naver_logo} alt="naver_logo" />
            <p>네이버로 시작하기</p>
          </div>
          <div className="kakao" onClick={() => handleLogin("kakao")}>
            <img src={kakao_logo} alt="kakao_logo" />
            <p>카카오로 시작하기</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;