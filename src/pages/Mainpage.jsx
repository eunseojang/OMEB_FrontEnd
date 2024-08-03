import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, NavLink } from 'react-router-dom';


// 리소스가 너무 많아서 로딩창 만들어야 할 듯
// 잘못된 라우팅 : 오류 페이지 제작..?
// 로그인 언제 완성?
// 반응형
// About us?

function Mainpage() {
  // 북마크 책
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  // 임시 나중에 수정해야 함, 북마크 책을 가져올 수 가 없음... 리뷰가 많은 책도 마찬가지
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
    });

    const fetchBookmarkedBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`
        );
        if (response.status === 200) {
          setBookmarkedBooks(response.data.bookTitleInfoResponseList);
        }
      } catch (error) {
        console.error('Error fetching bookmarked books:', error);
      }
    };

    fetchBookmarkedBooks();
  }, []);


  // 검색창
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
    <div className="main_page">
      
      {/* 인트로 */}
      <div className="intro">
        <h2 className="title">일심동책</h2>
        <p>힘든 하루로 지친 당신의 감정에<br/>위로를 건네는는 책 추천 서비스</p>

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
                searchResults.map((book, index) => (
                  // 검색한 도서 정보
                  <a
                    key={index} className="search-result-item"
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    
                    <img src={book.image} alt={book.title} />
                    <div className="search-book-info">
                      <p className="search-book-title">{book.title}</p>
                      <p className="search-book-author">{book.author}</p>
                      <p className="search-book-price">{book.discount}원</p>
                    </div>
                    {/* 쇼핑 카트 이미지 */}
                    <span className="material-icons">shopping_cart</span>
                  </a>
                ))
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
          {/* 수정 해야 함 */}
          {bookmarkedBooks.length ? (
            bookmarkedBooks.map((book, idx) => (
              <div key={idx} className="book-item">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <h5 className="book-title">{book.title}</h5>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
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
              <div key={idx} className="book-item">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <h5 className="book-title">{book.title}</h5>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
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
