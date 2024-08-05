import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './BookFinder.css';
import bookfinder_background from '../assets/bookfinder/bookfinder_background_image.jpg';

function BookFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef();

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

        if (response.status === 200) {
          if (response.data.success === 'true') {
            setSearchResults(response.data.data.naverBookDTOList);
            setError('');
          } else {
            setSearchResults([]);
            setError('No results found.');
          }
        }
      } catch (error) {
        console.error('Error during search:', error);

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

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false);
    }
  };

  const handleRequest = async (isbn) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TEST_URL}/api/v1/book/application`,
        { isbn },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('신청되었습니다!');
      }
    } catch (error) {
      console.error('Error requesting book:', error);

      if (error.response && error.response.data) {
        const errorCode = error.response.data.code;
        if (errorCode === 'BOOK_0004') {
          alert('이미 보낸 요청입니다.');
        } else {
          alert('서버에러 나중에 시도해주세요.');
        }
      } else {
        alert('서버에러 나중에 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="bookfinder-container"
      style={{ backgroundImage: `url(${bookfinder_background})` }}
    >
      <div className="header-background">
        <div className="bookfinder-header">
          <h1>책 신청하기</h1>
          <p>마음에 드시는 책이 없으신가요?</p>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <div
          className="search-bar"
          ref={searchRef}
          onClick={() => setIsSearchActive(true)}
        >
          <input
            type="text"
            placeholder="Search for books..."
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
                  <div key={index} className="search-result-item">
                    {book.image ? (
                      <img src={book.image} alt={book.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    <div className="search-book-info">
                      <p className="search-book-title">{book.title}</p>
                      <p className="search-book-author">{book.author}</p>
                      <p className="search-book-price">
                        {book.discount === '0'
                          ? '재고 없음'
                          : `${book.discount}원`}
                      </p>
                      <p className="search-book-publisher">{book.publisher}</p>
                    </div>
                    <button
                      className="request-button"
                      onClick={() => handleRequest(book.isbn)}
                    >
                      신청하기
                    </button>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="material-icons"
                    >
                      open_in_new
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookFinder;
