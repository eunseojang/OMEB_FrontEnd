import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import './Header.css';
import axios from 'axios';

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  // 검색창
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchRef = useRef();

  const handleSearch = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setPage(1);

    if (term.length > 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/book/search`,
          {
            params: {
              title: term,
              page: 1,
              size: 10,
              sortDirection: 'DESC',
              sortBy: 'createdAt',
            },
          }
        );

        if (response.status === 200 && response.data.success === 'true') {
          setSearchResults(response.data.data.bookTitleInfoResponseLists);
          setTotalPages(response.data.data.totalPage);
          setError('');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setError('서버 에러입니다.');
        }
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setError('');
    }
  };

  const loadMoreResults = async (newPage) => {
    setPage(newPage);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TEST_URL}/api/v1/book/search`,
        {
          params: {
            title: searchTerm,
            page: newPage,
            size: 10,
            sortDirection: 'DESC',
            sortBy: 'createdAt',
          },
        }
      );

      if (response.status === 200 && response.data.success === 'true') {
        setSearchResults(response.data.data.bookTitleInfoResponseLists || []);
        setError('');
      }
    } catch (error) {
      console.error('서버 에러입니다.', error);
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

        {/* 검색창 */}
        <div
          className="header-search-bar"
          ref={searchRef}
          onClick={() => setIsSearchActive(true)}
        >
          <input
            type="text"
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="material-icons">search</span>
          {isSearchActive && searchTerm && (
            <div className="header-search-results">
              {error ? (
                <div className="header-error-message">{error}</div>
              ) : (
                // 도서 정보 검색
                <>
                  {searchResults.map((book, index) => (
                    <Link
                      key={index}
                      className="header-search-result-item"
                      to={`/detail/${book.bookId}`}
                    >
                      <img src={book.bookImage} alt={book.title} />
                      <div className="header-search-book-info">
                        <p className="header-search-book-title">{book.title}</p>
                        <p className="header-search-book-author">
                          {book.author}
                        </p>
                        <p className="header-search-book-price">
                          {book.price === '0' ? '재고 없음' : `${book.price}원`}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="pagination-buttons">
                    {page > 1 && (
                      <button onClick={() => loadMoreResults(page - 1)}>
                        이전 페이지
                      </button>
                    )}
                    {page < totalPages && (
                      <button onClick={() => loadMoreResults(page + 1)}>
                        다음 페이지
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="menu">
          <NavLink to="/BookFinder">
            <span className="menu-item">책 신청</span>
          </NavLink>
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
