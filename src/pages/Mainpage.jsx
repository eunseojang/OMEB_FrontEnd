import { useEffect, useState } from 'react';
import axios from 'axios';
import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';

const sections = [
  { title: '#리뷰 많은 책', books: [] },
  // { title: '#북마크 된 책', books: [] },
];

function Mainpage() {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  useEffect(() => {
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

  return (
    <div className="mainpage">
      <h2 className="main-h2">#감정 기반 추천</h2>
      <Bookshelf />
      {sections.map((section, index) => (
        <div key={index} className="section">
          <h2 className="main-h2">{section.title}</h2>
          <div className="book-list">
            {section.books.map((book, idx) => (
              <div key={idx} className="book-item">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="section">
        <h2 className="main-h2">#북마크 된 책</h2>
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
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">북마크된 책이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
