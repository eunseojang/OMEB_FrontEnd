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
import Footer from "../Rank/Footer.jsx";

const Mypages = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [isPointsModalOpen, setPointsModalOpen] = useState(false);
  const [isBookmarksModalOpen, setBookmarksModalOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      navigate("/login");
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

  const getLevelUpPoint = (level) => {
    let point = 100;

    for (let i = 1; i < level; i++) {
      point *= 2;
    }

    return point;
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

  // Calculate progress for the experience bar
  const calculateProgress = () => {
    if (!userInfo) return 0;
    const nextLevelExp = getLevelUpPoint(userInfo.level);
    return (userInfo.exp / nextLevelExp) * 100;
  };

  return (
    <div className="mypages">
      <div className="inner">
        {/* 프로필 */}
        <div className="profile-section">
          {/* 닉네임, 레벨 */}
          <div className="info">
            <img
              className="profile-image"
              src={userInfo?.profileImageUrl || profileImage}
              alt="Profile"
            />
            <p className="nickname">{userInfo?.nickname || "unknown"}</p>
            <p className="level">LV{userInfo?.level || "unknown"}</p>
            <div className="icon-container12" onClick={openModal}>
              <span className="material-icons">edit_note</span>
            </div>
          </div>

          {/* 북마크 */}
          <button className="bookMark" onClick={openBookmarksModal}>
            북마크 목록
          </button>
        </div>

        {/* 레벨 */}
        <div className="profile-level">
          {/* 남은 경험치(nxp 글자 색이랑 크기 다르게 하기) */}
          <p>
            남은 레벨까지
            <br />
            {getLevelUpPoint(userInfo?.level) - userInfo?.exp} 남음
          </p>

          {/* 경험치 바 */}
          {/* <div className="level-bar">
            <div className="example">
              <span onClick={openPointsModal} className="material-icons">
                contact_support
              </span>
            </div>
            <div
              className="example-bar"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
            <div className="example-2">
              <p className="start">0</p>
              <p className="xp">{userInfo?.exp || "0"}xp</p>{" "}
              <p className="end">{getLevelUpPoint(userInfo?.level)}</p>
            </div>
          </div> */}

          {/* 경험치 바 */}
          <div className="level-bar">
            <div className="example">
              <span onClick={openPointsModal} className="material-icons">
                contact_support
              </span>
            </div>
            <div
              className="example-bar"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
            <div className="example-2">
              <p className="start">0</p>
              <p className="xp">{userInfo?.exp || "0"}xp</p>{" "}
              <p className="end">{getLevelUpPoint(userInfo?.level)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 구간 나누기 */}
      <div className="block-box"></div>

      <div className="inner">
        {/* 리뷰 */}
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
                className="no-reviews-image"
                src={no_search}
                alt="No Reviews"
              />
              <p>리뷰가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 프로필 모달 */}
      {isModalOpen && <ProfileModal closeModal={closeModal} />}
      {isPointsModalOpen && <PointsModal closeModal={closePointsModal} />}
      {isBookmarksModalOpen && (
        <BookmarksModal closeModal={closeBookmarksModal} />
      )}
    </div>
  );
};

export default Mypages;
