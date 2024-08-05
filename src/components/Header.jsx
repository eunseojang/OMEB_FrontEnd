import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Header.css';

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking the existence of accessToken
    const accessToken = Cookies.get('accessToken');
    setIsLogin(accessToken !== undefined);
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    setIsLogin(false);
  };

  return (
    <div className="header-section">
      <header className="header">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          OMEB
        </Link>

        <div className="menu">
          <NavLink to="/Ranking" style={{ textDecoration: 'none' }}>
            <span className="menu-item">랭킹</span>
          </NavLink>
          {isLogin && (
            <NavLink to="/Mypages" style={{ textDecoration: 'none' }}>
              <span className="menu-item">마이페이지</span>
            </NavLink>
          )}
          {!isLogin ? (
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <span className="menu-item">로그인</span>
            </NavLink>
          ) : (
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <span onClick={handleLogout} className="menu-item">
                로그아웃
              </span>
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
