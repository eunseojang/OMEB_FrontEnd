import './Header.css';
import searchIcon from '../assets/searchIcon.png';
import notificationIcon from '../assets/notificationIcon.png';

function Header() {
  return (
    <div className="App">
      <header className="header">
        <span className="logo">OMEB</span>
        <div className="search-bar">
          <input type="text" placeholder="Search…" className="search-input" />
          <img className="search-icon" src={searchIcon} alt="Search" />
        </div>
        <div className="menu">
          <span className="menu-item">랭킹</span>
          <span className="menu-item">마이페이지</span>
          <span className="menu-item">로그아웃</span>
          <img
            className="notification-icon"
            src={notificationIcon}
            alt="Notifications"
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
