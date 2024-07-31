import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Header.css';
import searchIcon from '../assets/searchIcon.png';
import shoppingcartIcon from '../assets/header/shopping_cart.png';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef();

  // 검색 기능 추가
  const handleSearch = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_TEST_URL}/api/v1/books/application`,
          {
            title: term,
          }
        );

        if (response.status === 200 && response.data.success === 'true') {
          setSearchResults(response.data.data.naverBookDTOList);
          setError('');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorCode = error.response.data.code;
          if (errorCode === 'BOOK_0003') {
            setError(
              '검색 결과가 너무 많습니다. 검색어를 더 구체적으로 입력해주세요.'
            );
          } else if (errorCode === 'BOOK_0002') {
            setError('해당 책 제목에 대한 검색 결과가 없습니다.');
          } else {
            setError('서버 에러입니다.');
          }
        } else {
          setError('서버 에러입니다.');
        }
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setError('');
    }
  };

  // 검색 상자 밖에 누르면 비활성화 상자를 다시 누르면 활성화
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header-section">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">OMEB</span>
        </Link>
        <div
          className="search-bar"
          ref={searchRef}
          onClick={() => setIsSearchActive(true)}
        >
          <input
            type="text"
            placeholder="Search…"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <img className="search-icon" src={searchIcon} alt="Search" />
          {isSearchActive && searchTerm && (
            <div className="search-results">
              {error ? (
                <div className="error-message">{error}</div>
              ) : (
                searchResults.map((book, index) => (
                  <div key={index} className="search-result-item">
                    <img src={book.image} alt={book.title} />
                    <div className="search-book-info">
                      <p className="search-book-title">{book.title}</p>
                      <p className="search-book-author">{book.author}</p>
                      <p className="search-book-price">{book.discount}원</p>
                    </div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="buy-button"
                    >
                      <img
                        className="shoppingcart"
                        src={shoppingcartIcon}
                        alt="Buy"
                      />
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
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
        </div>
      </header>
    </div>
  );
}

export default Header;
