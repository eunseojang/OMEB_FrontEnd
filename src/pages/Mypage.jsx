import { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';
import profileImage from '../assets/profile_image.png'; // 프로필 이미지 경로
import bookCover from '../assets/book_cover.png'; // 책 커버 이미지 경로
import no_search from '../assets/mypage/No_search.png'; // 리뷰 책 찾을 수 없음 이미지 경로
import ProfileModal from './ProfileModal.jsx';
import { getJwtToken } from './getJwtToken';

const Mypages = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

  // 임시 리뷰
  const tempReview = {
    reviewId: 1,
    bookTitle: '노인과 바다',
    content: '이 책은 정말 재밌어요!',
    tag: 'HAPPINESS',
    likeCount: 1004,
    createdAt: '2024-08-03T05:15:49.112Z',
    updatedAt: '2024-08-03T05:15:49.112Z',
  };

  // 임시 토큰
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getJwtToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, []);

  //  유저 정보 가져오기
  const fetchUserInfo = async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/user/my-page`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  // 유저 리뷰 가져오기
  useEffect(() => {
    if (token) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_TEST_URL}/api/my-reviews`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setReviews(response.data.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
      fetchReviews();
    }
  }, [token]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mypages">
      <div className="profile-section">
        <img
          className="profile-image"
          src={userInfo?.profileImageUrl || profileImage}
          alt="Profile"
        />
        <div className="profile-details">
          <div className="level-xp">
            <h2>{userInfo?.nickname || 'unknown'}</h2>
            <div className="level">LV {userInfo?.level || 'unknown'}</div>
          </div>
          <div className="xp">{userInfo?.exp || '0'}xp</div>
          <button className="edit-profile" onClick={openModal}>
            프로필 수정하기
          </button>
        </div>
      </div>
      <div className="reviews-section">
        <h3>작성한 리뷰</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="review-card">
              <img className="book-cover" src={bookCover} alt="Book Cover" />
              <div className="review-details">
                <div className="review-title-rating">
                  <div className="review-title">{review.bookTitle}</div>
                  <div className="review-rating">#{review.tag}</div>
                </div>
                <div className="review-content">{review.content}</div>
                <div className="review-actions">
                  <button className="edit-button">수정</button>
                  <button className="delete-button">삭제</button>
                  <div className="like-count">❤ {review.likeCount}</div>
                  <div className="review-date">
                    {new Date(review.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // 리뷰가 없을 때
          <div className="no-reviews">
            <img
              src={no_search}
              alt="No reviews"
              className="no-reviews-image"
            />
            <p className="no-reviews-text">
              리뷰가 없어요. 첫 번째 리뷰 작성 해보세요!
            </p>
          </div>
        )}
        {/* 임시 리뷰 */}
        <div className="review-card">
          <img className="book-cover" src={bookCover} alt="Book Cover" />
          <div className="review-details">
            <div className="review-title-rating">
              <div className="review-title">{tempReview.bookTitle}</div>
              <div className="review-rating">#{tempReview.tag}</div>
            </div>
            <div className="review-content">{tempReview.content}</div>
            <div className="review-actions">
              <button className="edit-button">수정</button>
              <button className="delete-button">삭제</button>
              <div className="like-count">❤ {tempReview.likeCount}</div>
              <div className="review-date">
                {new Date(tempReview.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        {/* 임시 리뷰 여기까지 */}
      </div>
      {isModalOpen && (
        <ProfileModal
          closeModal={closeModal}
          token={token}
          userProfile={fetchUserInfo}
        />
      )}
    </div>
  );
};

export default Mypages;
