import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import addBookmarkImage from '../assets/add-bookmarks.png';
import Cookies from 'js-cookie';

const BookSection = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_TEST_URL}/api/v2/book/${bookId}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setBook(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching the book data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-section">
      <img className="book-image" src={book.bookImage} alt={book.title} />
      <div className="book-info">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author">
          {book.author} | {book.publisher} | {book.publicationDate}
        </p>
        <p className="price">판매가 {book.price}원</p>
        <p className="book-decription">{book.description}</p>
        <a href={book.sellLink} className="buy-button">
          구매하러가기
        </a>
        <p className="price">판매가 {book.price}원</p>
      </div>
      <button
        className="bookMark"
        onClick={async () => {
          try {
            const token = Cookies.get('accessToken');

            await axios.post(
              `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark/${bookId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            alert('이 책이 북마크에 추가되었습니다.');
          } catch (error) {
            if (error.response.data.code === 'AUTH_0003') {
              alert('로그인해야 북마크를 추가할 수 있습니다.');
            } else if (error.response.data.code === 'BOOK_0005') {
              alert('이미 북마크된 책입니다.');
            } else {
              alert('북마크를 실패했습니다.');
            }
          }
        }}
      >
        <img src={addBookmarkImage} alt="bookMark"></img>
      </button>
    </div>
  );
};

export default BookSection;
