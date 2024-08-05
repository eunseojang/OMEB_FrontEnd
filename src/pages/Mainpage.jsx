import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';
import AOS from 'aos'; // 애니메이션
import 'aos/dist/aos.css';
import { getJwtToken } from './getJwtToken'; // 임시 토큰 얻기
import { useNavigate } from 'react-router-dom';

// 로딩창 만들어야 할 듯?
// 잘못된 라우팅 : 오류 페이지 제작...
// 반응형
// About us?

function Mainpage() {
  // 북마크 책
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [topReviewedBooks, setTopReviewedBooks] = useState([]);
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);

  // 임시 나중에 수정해야 함, 북마크 책을 가져올 수 가 없음... 리뷰가 많은 책도 마찬가지
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
    });

    const fetchTokenAndData = async () => {
      const fetchedToken = await getJwtToken();
      // setToken(fetchedToken);

      if (fetchedToken) {
        try {
          // 북마크 가져오기
          const response = await axios.get(
            `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`,
            {
              headers: {
                Authorization: `Bearer ${fetchedToken}`,
              },
            }
          );
          if (response.status === 200) {
            setBookmarkedBooks(response.data.data.bookTitleInfoResponseList);
          }
        } catch (error) {
          console.error('Error fetching bookmarked books:', error);
        }

        try {
          // 리뷰 많은 책 가져오기
          const response = await axios.get(
            `${import.meta.env.VITE_TEST_URL}/api/v1/book/review-rank`
          );
          if (response.status === 200) {
            setTopReviewedBooks(response.data.data.bookTitleInfoResponseList);
          }
        } catch (error) {
          console.error('Error fetching top reviewed books:', error);
        }
      }
    };

    fetchTokenAndData();
  }, []);

  // 검색창
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchRef = useRef();

  // 검색 기능 추가
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

  return (
    <div className="main_page">
      
      {/* 배경 */}
      <div className="back">
        <div className="box"></div>
      </div>


      {/* 인트로 */}
      <div className="intro">

        <h2 className="title">일심동책</h2>
        <p>
          힘든 하루로 지친 당신의 감정에
          <br />
          위로를 건네는 책 추천 서비스
        </p>

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
                    <a
                      key={index}
                      className="search-result-item"
                      href={`/detail/${book.bookId}`}
                    >
                      <img src={book.bookImage} alt={book.title} />
                      <div className="search-book-info">
                        <p className="search-book-title">{book.title}</p>
                        <p className="search-book-author">{book.author}</p>
                        <p className="search-book-price">
                          {book.price === '0' ? '재고 없음' : `${book.price}원`}
                        </p>
                      </div>
                      {/* <span className="material-icons">shopping_cart</span> */}
                    </a>
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
        <div className="book-list">
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
      </div>

      <div className="section-2">
        <h4>#좋아요 많은 책</h4>
        <div className="book-list">
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
            <div className="no-books">좋아요 받은 책이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
