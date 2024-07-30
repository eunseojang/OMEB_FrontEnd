import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";
import { useParams } from "react-router-dom";

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
      `${import.meta.env.VITE_TEST_URL}/api/v1/reviews/${bookId}`
    );
    setReviews(response.data.data || []);
  };

  const handleCreate = async () => {
    if (!tag) {
      alert("태그를 선택해 주세요."); 
      return;
    }

    await axios.post(
      `${import.meta.env.VITE_TEST_URL}/api/v1/review/${bookId}`,
      { content: newReview, tag } 
    );
    setNewReview("");
    setTag("");
    fetchReviews();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/reviews/${id}`);
    fetchReviews();
  };

  const handleEdit = async (id) => {
    await axios.put(`/api/reviews/${id}`, { content: editingReview });
    setEditingReview(null);
    fetchReviews();
  };

  const handleLike = async (id) => {
    await axios.post(`/api/reviews/${id}/like`);
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
            <div key={review.id} className="review-item">
              <p>{review.content}</p>
              <p>태그: {review.tag}</p>
              <button onClick={() => handleLike(review.id)}>좋아요</button>
              <button onClick={() => handleDelete(review.id)}>삭제</button>
              <button onClick={() => setEditingReview(review.content)}>
                수정
              </button>
              {editingReview && (
                <div className="edit-input">
                  <input
                    type="text"
                    value={editingReview}
                    onChange={(e) => setEditingReview(e.target.value)}
                  />
                  <button onClick={() => handleEdit(review.id)}>확인</button>
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
