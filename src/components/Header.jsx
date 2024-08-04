import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Header.css";
import Cookies from "js-cookie";

function Header() {
  const isLogin = Cookies.get("accesToken");

  return (
    <div className="header-section">
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">OMEB</span>
        </Link>

        <div className="menu">
          <NavLink to="/Ranking" style={{ textDecoration: "none" }}>
            <span className="menu-item">랭킹</span>
          </NavLink>
          {!isLogin && (
            <NavLink to="/Mypages" style={{ textDecoration: "none" }}>
              <span className="menu-item">마이페이지</span>
            </NavLink>
          )}
          {isLogin ? (
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <span className="menu-item">로그인</span>
            </NavLink>
          ) : (
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <span
                onClick={() => {
                  Cookies.remove("accessToken");
                  Cookies.remove("refreshToken");
                }}
                className="menu-item"
              >
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
