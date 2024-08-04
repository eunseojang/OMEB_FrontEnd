import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <p className="book-decription">{book.description}</p>
        <a href={book.sellLink} className="buy-button">
          구매하러가기
        </a>
        <p className="price">판매가 {book.price}원</p>
      </div>
    </div>
  );
};

export default BookSection;
