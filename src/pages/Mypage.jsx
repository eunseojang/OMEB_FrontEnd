import { useState } from 'react';
import './Mypage.css';
// 임시 이미지
import profileImage from '../assets/profile_image.png'; // 프로필 이미지 경로
import bookCover from '../assets/book_cover.png'; // 책 커버 이미지 경로
import ProfileModal from './ProfileModal.jsx';

const Mypages = () => {
  // 모달창
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mypages">
      <div className="profile-section">
        <img className="profile-image" src={profileImage} alt="Profile" />
        <div className="profile-details">
          <div className="level-xp">
            <h2>김oo</h2>
            <div className="level">LV 100</div>
          </div>
          <div className="xp">10,100xp</div>
          <button className="edit-profile" onClick={openModal}>
            프로필 수정하기
          </button>
        </div>
      </div>
      <div className="reviews-section">
        <h3>작성한 리뷰</h3>
        <div className="review-card">
          {/* 나중에 따로 연결 */}
          <img className="book-cover" src={bookCover} alt="Book Cover" />
          <div className="review-details">
            <div className="review-title-rating">
              <div className="review-title">노인과 바다</div>
              <div className="review-rating"># 사용자가 선택한 감정</div>
            </div>
            <div className="review-content">
              리뷰 내용 ........................................................
            </div>
          </div>
        </div>
        <div className="review-card">
          <img className="book-cover" src={bookCover} alt="Book Cover" />
          <div className="review-details">
            <div className="review-title-rating">
              <div className="review-title">노인과 바다</div>
              <div className="review-rating"># 사용자가 선택한 감정</div>
            </div>
            <div className="review-content">
              리뷰 내용 ........................................................
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <ProfileModal closeModal={closeModal} />}
    </div>
  );
};

export default Mypages;