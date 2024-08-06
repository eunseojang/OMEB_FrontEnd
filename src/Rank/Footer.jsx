import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo"></div>
        <div className="footer-info">
          <h2>OMEB</h2>
          <p>Team: 일심동책</p>
          <p>전화번호: 010-7107-5470</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Company Omeb. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
