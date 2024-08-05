import { useState, useEffect } from "react";
import axios from "axios";
import "./Mypage.css";
import profileImage from "../assets/profile_image.png";
import no_search from "../assets/mypage/No_search.png";
import ProfileModal from "./ProfileModal.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PointsModal from "./PointsModal.jsx";
import addBookmarkImage from "../assets/add-bookmarks.png";
import BookmarksModal from "./BookMarkModal.jsx";

const Mypages = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [isPointsModalOpen, setPointsModalOpen] = useState(false);
  const [isBookmarksModalOpen, setBookmarksModalOpen] = useState(false); // State for BookmarksModal

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  const openPointsModal = () => {
    setPointsModalOpen(true);
  };

  const closePointsModal = () => {
    setPointsModalOpen(false);
  };

  const openBookmarksModal = () => {
    setBookmarksModalOpen(true);
  };

  const closeBookmarksModal = () => {
    setBookmarksModalOpen(false);
  };

  const fetchUserInfo = async () => {
    try {
      const token = Cookies.get("accessToken");
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
      console.error("Error fetching user info:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const token = Cookies.get("accessToken");

      const response = await axios.get(
        `${import.meta.env.VITE_TEST_URL}/api/v1/my-reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data.data.userReviewPageResponseList);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchReviews();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (reviewId, content) => {
    setEditingReviewId(reviewId);
    setEditingContent(content);
  };

  const handleSaveEdit = async (reviewId, tag) => {
    try {
      const token = Cookies.get("accessToken");
      await axios.patch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/review/${reviewId}`,
        { content: editingContent, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchReviews();
      setEditingReviewId(null);
      alert("리뷰가 수정되었습니다.");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("정말 이 리뷰를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const token = Cookies.get("accessToken");
      await axios.delete(
        `${import.meta.env.VITE_TEST_URL}/api/v1/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
      alert("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("리뷰 삭제에 실패했습니다.");
    }
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
            <h2>{userInfo?.nickname || "unknown"}</h2>
            <div className="level">LV {userInfo?.level || "unknown"}</div>
          </div>
          <div className="point-flex">
            <div className="xp">{userInfo?.exp || "0"}xp</div>{" "}
            <button onClick={openPointsModal} className="points-button">
              포인트 내역 보기
            </button>
          </div>
          <button className="edit-profile" onClick={openModal}>
            프로필 수정하기
          </button>
        </div>
        <button className="bookMark" onClick={openBookmarksModal}>
          북마크 목록
        </button>
      </div>
      <div className="reviews-section">
        <h3>작성한 리뷰</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="review-card">
              <img
                className="book-cover"
                src={review.bookImage}
                alt="Book Cover"
                onClick={() => {
                  navigate(`/detail/${review.bookId}`);
                }}
              />
              <div className="review-details">
                <div className="review-title-rating">
                  <div className="review-title">{review.bookTitle}</div>
                  <div className="review-rating">#{review.reviewTag}</div>
                </div>
                {editingReviewId === review.reviewId ? (
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                ) : (
                  <div className="review-content">{review.reviewContent}</div>
                )}
                <div className="review-actions">
                  {editingReviewId === review.reviewId ? (
                    <button
                      className="save-button"
                      onClick={() =>
                        handleSaveEdit(review.reviewId, review.reviewTag)
                      }
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(review.reviewId, review.reviewContent)
                      }
                    >
                      수정
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(review.reviewId)}
                  >
                    삭제
                  </button>
                  <div className="like-count">❤ {review.likeCount}</div>
                  <div className="review-date">
                    {new Date(review.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
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
      </div>

      {isPointsModalOpen && <PointsModal closeModal={closePointsModal} />}
      {isModalOpen && (
        <ProfileModal closeModal={closeModal} userProfile={fetchUserInfo} />
      )}
      {isBookmarksModalOpen && (
        <BookmarksModal closeModal={closeBookmarksModal} />
      )}
    </div>
  );
};

export default Mypages;
