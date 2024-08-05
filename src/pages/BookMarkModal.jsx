import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookmarksModal.css';
import Cookies from 'js-cookie';

const BookmarksModal = ({ closeModal }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookmarks(response.data.data.bookTitleInfoResponseList);
      } catch (error) {
        console.error('Error fetching bookmarks data:', error);
        setError('북마크 데이터를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchBookmarks();
  }, []);

  const handleDeleteBookmark = async (bookId) => {
    const confirmDelete = window.confirm('정말 이 북마크를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const token = Cookies.get('accessToken');
      await axios.delete(
        `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookmarks(bookmarks.filter((bookmark) => bookmark.bookId !== bookId));
      alert('북마크가 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      alert('북마크 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="modal-overlay12">
      <div className="modal-content12">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>북마크 목록</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : bookmarks.length > 0 ? (
          <ul className="bookmarks-list">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.bookId} className="bookmarks-item">
                <img
                  src={bookmark.bookImage}
                  alt={bookmark.title}
                  className="bookmark-image"
                />
                <div className="bookmark-details">
                  <h3 className="bookmark-title">{bookmark.title}</h3>
                  <p className="bookmark-author">저자: {bookmark.author}</p>
                  <p className="bookmark-price">가격: {bookmark.price}원</p>
                  <button
                    className="delete-bookmark-button"
                    onClick={() => handleDeleteBookmark(bookmark.bookId)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-bookmarks">북마크가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BookmarksModal;
