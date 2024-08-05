import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RecommendPage.css';
import axios from 'axios';
import open_book from '../assets/recommend/open_book.png';

import 무기력_label from '../assets/recommend/무기력_label.png';
import 분노_label from '../assets/recommend/분노_label.png';
import 불안_label from '../assets/recommend/불안_label.png';
import 사랑_label from '../assets/recommend/사랑_label.png';
import 성취감_label from '../assets/recommend/성취감_label.png';
import 외로움_label from '../assets/recommend/외로움_label.png';
import 우울_label from '../assets/recommend/우울_label.png';
import 질투_label from '../assets/recommend/질투_label.png';
import 행복_label from '../assets/recommend/행복_label.png';

import { getToken } from './getJwtToken';

// 행복 라벨 없음

const labels = {
  lethargy: 무기력_label,
  anger: 분노_label,
  anxiety: 불안_label,
  love: 사랑_label,
  accomplishment: 성취감_label,
  loneliness: 외로움_label,
  depression: 우울_label,
  jealousy: 질투_label,
  happiness: 행복_label,
};

const p_emotion = {
  lethargy: '무기력',
  anger: '분노',
  anxiety: '불안',
  love: '사랑',
  accomplishment: '성취감',
  loneliness: '외로움',
  depression: '우울',
  jealousy: '질투',
  happiness: '행복',
};

const RecommendPage = () => {
  const { emotion } = useParams();
  const navigate = useNavigate();

  // 좋아요 버튼
  const [isLiked, setIsLiked] = useState(false);
  const [likedReviews, setLikedReviews] = useState({});
  // 책 추천
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  // 리뷰
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = getToken();
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/book/emotion`,
          {
            params: { emotion: emotion.toUpperCase() },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data.bookTitleInfoList);
        if (response.status === 200) {
          setBookRecommendations(response.data.data.bookTitleInfoList);
        }
      } catch (error) {
        console.error('추천을 가져오지 못했습니다.:', error);
      }
    };

    fetchRecommendations();
  }, [emotion]);

  // 특정 책 리뷰 가져오기 (나중에 수정 될 것 같음)
  useEffect(() => {
    if (bookRecommendations.length > 0) {
      fetchReviews(currentBookIndex);
    }
  }, [bookRecommendations, currentBookIndex]);

  const fetchReviews = async (bookIndex) => {
    const token = getToken();
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }
    // console.log(bookRecommendations[bookIndex]);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TEST_URL}/api/v2/reviews/${
          bookRecommendations[bookIndex].bookId
        }`,
        {
          params: {
            page: 1,
            size: 10,
            sortDirection: 'DESC',
            sortBy: 'createdAt',
            isLiked: false,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.reviewInfoResponseList);
      if (response.status === 200) {
        setReviews(response.data.data.reviewInfoResponseList);
        setCurrentReviewIndex(0); // Reset to the first review
      }
    } catch (error) {
      console.error('리뷰를 가져오지 못했습니다.:', error);
    }
  };

  // 좋아요 버튼
  const handleClose = () => {
    navigate('/');
  };

  const handleLikeClick = async () => {
    const token = getToken();
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }

    const reviewId = reviews[currentReviewIndex].reviewId;
    if (likedReviews[reviewId]) {
      alert('이미 좋아요를 누른 리뷰입니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TEST_URL}/api/v1/review/${reviewId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsLiked(true);
        setLikedReviews((prev) => ({ ...prev, [reviewId]: true }));
        setReviews((prevReviews) =>
          prevReviews.map((review, index) =>
            index === currentReviewIndex
              ? { ...review, likeCount: review.likeCount + 1 }
              : review
          )
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('이미 좋아요를 누른 리뷰입니다.');
      } else {
        console.error('좋아요 에러:', error);
      }
    }
  };

  // 다음 버튼 (오른쪽)
  const handleNextBook = () => {
    if (currentBookIndex < bookRecommendations.length - 1) {
      setCurrentBookIndex(currentBookIndex + 1);
    }
  };

  // 이전 버튼 (왼쪽)
  const handlePreviousBook = () => {
    if (currentBookIndex > 0) {
      setCurrentBookIndex(currentBookIndex - 1);
    }
  };

  // 다음 리뷰
  const handleNextReview = () => {
    if (currentReviewIndex < reviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
    }
  };

  // 책 자세히 보기
  const handleGoToBook = () => {
    navigate(`/Detail/${bookRecommendations[currentBookIndex].bookId}`);
  };

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            '--x': `${x}px`,
            '--y': `${y}px`,
          }}
        ></div>
      );
    }
    return particles;
  };

  return (
    // 기존 인터페이스 어두운 색으로 가림
    <div className="recommend_back">
      {/* 콘텐츠 */}
      <div className="recommend">
        {/* 펼쳐진 책 이미지 */}
        <div className="image">
          <img src={open_book} alt="open_book" />
        </div>

        {/* 감정 책갈피 */}
        <div className="recommend_book">
          <div className="book_label">
            <img src={labels[emotion]} alt={emotion} />
            <p>{p_emotion[emotion]}</p>
            {/* 선택한 책의 감정이 들어감
            <p>{id}</p> */}
          </div>
        </div>

        {/* 왼쪽 페이지 */}
        <div className="left">
          {/* 책 표지 */}
          {/* 비동기 방식에 의한 에러 해결 */}
          {bookRecommendations.length > 0 && (
            <>
              <div className="book_cover">
                <img
                  src={bookRecommendations[currentBookIndex].imageUrl}
                  alt="책 표지"
                />
              </div>
              {/* 왼쪽 버튼 */}
              <span
                className="material-icons"
                onClick={handlePreviousBook}
                disabled={currentBookIndex === 0}
              >
                chevron_left
              </span>
              {/* 책 보러가기 버튼 */}
              <button onClick={handleGoToBook}>책 보러가기</button>
            </>
          )}
        </div>

        {/* 오른쪽 페이지 */}
        <div className="right">
          {/* 창 닫기 */}
          <div className="close">
            <span className="material-icons" onClick={handleClose}>
              close
            </span>
          </div>

          {/* 앞으로 가기 */}
          <div className="chevron_right">
            <span
              className="material-icons"
              onClick={handleNextBook}
              disabled={currentBookIndex === bookRecommendations.length - 1}
            >
              chevron_right
            </span>
          </div>

          {/* 리뷰 */}
          {/* 나중에 꾸미기 */}
          <div className="review">
            {reviews.length > 0 ? (
              <div>
                <p>
                  <strong>{reviews[currentReviewIndex].userNickname}</strong>:{' '}
                  {reviews[currentReviewIndex].content}
                </p>
                <p>Tag: {reviews[currentReviewIndex].tag}</p>
                <p>Likes: {reviews[currentReviewIndex].likeCount}</p>
              </div>
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="btns">
            {/* 좋아요 버튼 */}
            <button
              className={`like ${isLiked ? 'active' : ''}`}
              onClick={handleLikeClick}
              disabled={reviews.length === 0}
            >
              좋아요&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="material-icons">favorite</span>
              {isLiked && (
                <div className="particles">{generateParticles()}</div>
              )}
            </button>
            {/* 다른 리뷰 */}
            <button className="new" onClick={handleNextReview}>
              다른 리뷰&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="material-icons">featured_play_list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
