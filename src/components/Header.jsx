import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import searchIcon from '../assets/searchIcon.png';
import notificationIcon from '../assets/notificationIcon.png';

// 나중에 NavLink에 스타일 추가하기

function Header() {
  return (
    <div className="App">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">OMEB</span>
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search…" className="search-input" />
          <img className="search-icon" src={searchIcon} alt="Search" />
        </div>
        <div className="menu">
          <NavLink to="/Ranking" style={{ textDecoration: 'none' }}>
            <span className="menu-item">랭킹</span>
          </NavLink>
          <NavLink to="/Mypages" style={{ textDecoration: 'none' }}>
            <span className="menu-item">마이페이지</span>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <span className="menu-item">로그인</span>
          </NavLink>
          <NavLink>
            <img
              className="notification-icon"
              src={notificationIcon}
              alt="Notifications"
            />
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default Header;
