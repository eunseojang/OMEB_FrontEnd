import { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [tag, setTag] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowInput(false);
      } else {
        setShowInput(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_TEST_URL}/api/v2/reviews/${bookId}`
    );
    setReviews(response.data.data.reviewInfoResponseList || []);
  };

  const handleCreate = async () => {
    if (!tag) {
      alert("태그를 선택해 주세요.");
      return;
    }

    const token = Cookies.get("accessToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_TEST_URL}/api/v1/review/${bookId}`,
        { content: newReview, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewReview("");
      setTag("");
      fetchReviews();
    } catch (error) {
      if (error.response.data.code === "AUTH_0003") {
        alert("로그인해야 리뷰를 작성할 수 있습니다.");
      } else {
        alert("리뷰 게시에 실패했습니다.");
      }
    }
  };

  const handleEdit = async (id) => {
    await axios.put(`/api/reviews/${id}`, { content: editingReview });
    setEditingReview(null);
    fetchReviews();
  };

  const handleLike = async (id) => {
    const token = Cookies.get("accessToken");

    try {
      await axios.post(
        `${import.meta.env.VITE_TEST_URL}/api/v1/review/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response.data.code === "AUTH_0002") {
        await getRefresh();
        await handleLike();
      } else if (error.response.data.code === "AUTH_0003") {
        alert("로그인해야 좋아요를 누를 수 있습니다.");
      } else {
        alert("이미 좋아요를 누른 리뷰입니다.");
      }
    }

    fetchReviews();
  };

  const tagOptions = [
    { value: "", label: "선택해주세요" },
    { value: "DEPRESSION", label: "우울" },
    { value: "ANGER", label: "분노" },
    { value: "ANXIETY", label: "불안" },
    { value: "LONELINESS", label: "외로움" },
    { value: "JEALOUSY", label: "질투" },
    { value: "HAPPINESS", label: "행복" },
    { value: "LETHARGY", label: "무기력" },
    { value: "LOVE", label: "사랑" },
    { value: "ACCOMPLISHMENT", label: "성취감" },
  ];

  return (
    <div className="review-container">
      <h1>#리뷰</h1>
      <hr />
      <div className="review-list">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div key={review.reviewId} className="review-item">
              <div className="review-header">
                <div className="review-flex">
                  <div className="review-profile">
                    <img
                      src={review.userProfileImage}
                      alt={`${review.userNickname}'s profile`}
                      className="user-img"
                    />
                    <p className="user-nickname">{review.userNickname}</p>
                    <p className="user-level">(LV.{review.level})</p>
                  </div>
                  <p className="user-review-tag">태그: {review.tag}</p>
                </div>
                <div>
                  <div className="points-date">
                    {new Date(review.createdAt).toLocaleString()}
                  </div>

                  <div className="review-actions">
                    <button onClick={() => handleLike(review.reviewId)}>
                      <p>
                        <span className="material-icons">favorite</span> 좋아요
                        ({review.likeCount})
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <p className="review-content">{review.content}</p>

              {editingReview === review.content && (
                <div className="edit-input">
                  <input
                    type="text"
                    value={editingReview}
                    onChange={(e) => setEditingReview(e.target.value)}
                  />
                  <button onClick={() => handleEdit(review.reviewId)}>
                    확인
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      {showInput && (
        <div className="review-input">
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {tagOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성하세요"
          />
          <button onClick={handleCreate}>작성하기</button>
        </div>
      )}
    </div>
  );
};

export default Review;
