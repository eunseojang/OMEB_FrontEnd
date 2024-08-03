import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Header.css';

function Header() {

  return (
    
    <div className="header-section">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">OMEB</span>
        </Link>
        
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
        </div>
      </header>
    </div>
  );
}

export default Header;
