import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';
import AOS from 'aos'; // 애니메이션
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Mainpage() {
  // 북마크 책
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [topReviewedBooks, setTopReviewedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
    });

    // 토큰 가져오기
    const fetchToken = async () => {
      return Cookies.get('accessToken');
    };

    // 북마크 가져오기
    const fetchBookmarkedBooks = async (token) => {
      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setBookmarkedBooks(response.data.data.bookTitleInfoResponseList);
          }
        } catch (error) {
          console.error('북마크 책을 가져올 수 없습니다.:', error);
        }
      }
    };

    // 리뷰 가져오기
    const fetchTopReviewedBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/book/review-rank`
        );
        if (response.status === 200) {
          setTopReviewedBooks(response.data.data.bookTitleInfoResponseList);
        }
      } catch (error) {
        console.error('리뷰 많은 책을 가져올 수 없습니다.:', error);
      }
    };

    const initialize = async () => {
      const token = await fetchToken();
      fetchBookmarkedBooks(token);
      fetchTopReviewedBooks();
    };

    initialize();
  }, []);

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

  // 좌우 스크롤
  const topReviewedBooksRef = useRef(null);
  const bookmarkedBooksRef = useRef(null);

  const handleScrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="main_page">
      {/* 인트로 */}
      <div className="intro">
        <h2 className="title">일심동책</h2>
        <p>
          힘든 하루로 지친 당신의 감정에
          <br />
          위로를 건네는는 책 추천 서비스
        </p>

        {/* 책을 찾을 수 없나요? */}
        <div className="bookfinder-link">
          <Link to="/bookfinder">책을 찾을 수 없나요?</Link>
        </div>

        {/* 검색창 */}
        <div
          className="search-bar"
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
            <div className="search-results">
              {error ? (
                <div className="error-message">{error}</div>
              ) : (
                // 도서 정보 검색
                <>
                  {searchResults.map((book, index) => (
                    <Link
                      key={index}
                      className="search-result-item"
                      to={`/detail/${book.bookId}`}
                    >
                      <img src={book.bookImage} alt={book.title} />
                      <div className="search-book-info">
                        <p className="search-book-title">{book.title}</p>
                        <p className="search-book-author">{book.author}</p>
                        <p className="search-book-price">
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
      </div>

      {/* 첵 */}
      <Bookshelf />

      {/* 리뷰 많은 책 */}
      <div className="section-1">
        <h4>#리뷰 많은 책</h4>
        <div className="scroll-buttons">
          {topReviewedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollLeft(topReviewedBooksRef)}
            >
              chevron_left
            </span>
          )}
          <div className="book-list" ref={topReviewedBooksRef}>
            {topReviewedBooks.length ? (
              topReviewedBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="book-item"
                  onClick={() => {
                    navigate(`/detail/${book.bookId}`);
                  }}
                >
                  <img
                    src={book.bookImage}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">
                      {book.price === '0' ? '재고 없음' : `${book.price}원`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books">책이 없습니다.</div>
            )}
          </div>
          {topReviewedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollRight(topReviewedBooksRef)}
            >
              chevron_right
            </span>
          )}
        </div>
      </div>

      {/* 북마크 된 책 */}
      <div className="section-2">
        <h4>#북마크 된 책</h4>
        <div className="scroll-buttons">
          {bookmarkedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollLeft(bookmarkedBooksRef)}
            >
              chevron_left
            </span>
          )}
          <div className="book-list" ref={bookmarkedBooksRef}>
            {bookmarkedBooks.length ? (
              bookmarkedBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="book-item"
                  onClick={() => {
                    navigate(`/detail/${book.bookId}`);
                  }}
                >
                  <img
                    src={book.bookImage}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">
                      {book.price === '0' ? '재고 없음' : `${book.price}원`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books">북마크된 책이 없습니다.</div>
            )}
          </div>
          {bookmarkedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollRight(bookmarkedBooksRef)}
            >
              chevron_right
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
