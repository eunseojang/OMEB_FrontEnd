import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PointsModal.css"; // Create a CSS file for styling
import Cookies from "js-cookie";

const PointsModal = ({ closeModal }) => {
  const [points, setPoints] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/user/my-explogs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPoints(response.data.data);
      } catch (error) {
        console.error("Error fetching points data:", error);
        setError("포인트 데이터를 가져오는 데 문제가 발생했습니다.");
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>포인트 획득 내역</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : points.length > 0 ? (
          <ul className="points-list">
            {points.map((point) => (
              <li key={point.id} className="points-item">
                <div className="flex">
                  <div className="points-content">{point.content}</div>
                  <div className="points-date">
                    {new Date(point.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="points-exp">획득 경험치: {point.exp}xp</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>포인트 획득 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PointsModal;
