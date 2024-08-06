import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Bookshelf from "../components/Bookshelf";
import "./Mainpage.css";
import AOS from "aos"; // 애니메이션
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../Rank/Footer";

function Mainpage() {
  // 감정 Openai
  // 감정 글
  const [emotion, setEmotion] = useState("");

  // 북마크 책
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  // 리뷰 책
  const [topReviewedBooks, setTopReviewedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-back",
    });

    // 토큰 가져오기
    const fetchToken = async () => {
      return Cookies.get("accessToken");
    };

    // 북마크 가져오기
    const fetchBookmarkedBooks = async (token) => {
      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setBookmarkedBooks(response.data.data.bookTitleInfoResponseList);
          }
        } catch (error) {
          console.error("북마크 책을 가져올 수 없습니다.:", error);
        }
      }
    };

    // 리뷰 가져오기
    const fetchTopReviewedBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/book/review-rank`
        );
        if (response.status === 200) {
          setTopReviewedBooks(response.data.data.bookTitleInfoResponseList);
        }
      } catch (error) {
        console.error("리뷰 많은 책을 가져올 수 없습니다.:", error);
      }
    };

    const initialize = async () => {
      const token = await fetchToken();
      fetchBookmarkedBooks(token);
      fetchTopReviewedBooks();
    };

    initialize();
  }, []);

  // 감정 Openai 가져오기

  const handleEmotionChange = (event) => {
    setEmotion(event.target.value);
  };

  const handleEmotionSubmit = async (event) => {
    event.preventDefault();
    const token = await Cookies.get("accessToken");

    if (!token) {
      alert("로그인 후 이용가능합니다.");
      navigate("/login");
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "https://omeb.shop:8080/api/v1/ai",
        { text: emotion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success === "true") {
        navigate(`/recommend/${response.data.data.tag.toLowerCase()}`);
      }
    } catch (error) {
      console.error("태그 오류:", error);
    }
  };

  // 좌우 스크롤
  const topReviewedBooksRef = useRef(null);
  const bookmarkedBooksRef = useRef(null);

  const handleScrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="main_page">
      {/* 배경 */}
      <div className="back">
        <div className="box"></div>
      </div>

      {/* 인트로 */}
      <div className="intro">
        <h2 className="title">일심동책</h2>
        <p>
          힘든 하루로 지친 당신의 감정에
          <br />
          위로를 건네는 책 추천 서비스
        </p>

        {/* 감정 입력창 */}
        <form onSubmit={handleEmotionSubmit} className="emotion-form">
          <input
            type="text"
            placeholder="당신의 감정을 입력하세요…"
            value={emotion}
            onChange={handleEmotionChange}
          />
          <div className="dot"></div>
          <button type="submit">
            <span className="material-icons">add_reaction</span>
          </button>
        </form>
      </div>

      {/* 첵 */}
      <Bookshelf />

      {/* 리뷰 많은 책 */}
      <div className="section-1">
        <h4>#리뷰 많은 책</h4>
        <div className="scroll-buttons">
          {topReviewedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollLeft(topReviewedBooksRef)}
            >
              chevron_left
            </span>
          )}
          <div className="book-list" ref={topReviewedBooksRef}>
            {topReviewedBooks.length ? (
              topReviewedBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="book-item"
                  onClick={() => {
                    navigate(`/detail/${book.bookId}`);
                  }}
                >
                  <img
                    src={book.bookImage}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">
                      {book.price === "0" ? "재고 없음" : `${book.price}원`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books">책이 없습니다.</div>
            )}
          </div>
          {topReviewedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollRight(topReviewedBooksRef)}
            >
              chevron_right
            </span>
          )}
        </div>
      </div>

      {/* 북마크 된 책 */}
      <div className="section-2">
        <h4>#북마크 된 책</h4>
        <div className="scroll-buttons">
          {bookmarkedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollLeft(bookmarkedBooksRef)}
            >
              chevron_left
            </span>
          )}
          <div className="book-list" ref={bookmarkedBooksRef}>
            {bookmarkedBooks.length ? (
              bookmarkedBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="book-item"
                  onClick={() => {
                    navigate(`/detail/${book.bookId}`);
                  }}
                >
                  <img
                    src={book.bookImage}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">
                      {book.price === "0" ? "재고 없음" : `${book.price}원`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-books">북마크된 책이 없습니다.</div>
            )}
          </div>
          {bookmarkedBooks.length > 0 && (
            <span
              className="material-icons scroll-button"
              onClick={() => handleScrollRight(bookmarkedBooksRef)}
            >
              chevron_right
            </span>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mainpage;
