import { useEffect, useState } from 'react';
import axios from 'axios';
import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bannerImage from '../assets/Bannerbooks.jpg';

// 리소스가 너무 많아서 로딩창 만들어야 할 듯
// 잘못된 라우팅 : 오류 페이지 제작..?
// 로그인 언제 완성?
// 반응형
// About us?

function Mainpage() {
  // 북마크 책
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  // 임시 나중에 수정해야 함, 북마크 책을 가져올 수 가 없음... 리뷰가 많은 책도 마찬가지
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
    });

    const fetchBookmarkedBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/bookmark`
        );
        if (response.status === 200) {
          setBookmarkedBooks(response.data.bookTitleInfoResponseList);
        }
      } catch (error) {
        console.error('Error fetching bookmarked books:', error);
      }
    };

    fetchBookmarkedBooks();
  }, []);

  return (
    <div className="mainpage">
      <div
        className="banner-section"
        data-aos="fade-down"
        data-aos-duration="500"
        data-aos-easing="ease"
      >
        <img src={bannerImage} alt="Banner" className="banner-img" />
        <div className="banner-text">
          <h1>Welcome to OMEB</h1>
          <p>오늘의 감정에 맞춘 책 추천 서비스</p>
          {/* <p>
            OMEB는 오늘 당신이 느끼는 감정을 바탕으로 최고의 책을 추천해드리는
            맞춤형 도서 추천 서비스입니다. 각 감정에 맞춘 다양한 책들로, 당신의
            하루를 풍요롭게 만들어 드립니다. 기분이 좋든 나쁘든, OMEB는 언제나
            당신 곁에 있어 마음의 위로와 즐거움을 선사합니다. 감정을 입력하고,
            나만의 특별한 책을 만나보세요!
          </p> */}
        </div>
      </div>
      <h2 className="main-h2">#감정 기반 추천</h2>
      <Bookshelf />
      <div className="section">
        <h2 className="main-h2">#리뷰 많은 책</h2>
        <div className="book-list">
          {/* 수정 해야 함 */}
          {bookmarkedBooks.length ? (
            bookmarkedBooks.map((book, idx) => (
              <div key={idx} className="book-item">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">책이 없습니다.</div>
          )}
        </div>
      </div>
      <div className="section">
        <h2 className="main-h2">#북마크 된 책</h2>
        <div className="book-list">
          {bookmarkedBooks.length ? (
            bookmarkedBooks.map((book, idx) => (
              <div key={idx} className="book-item">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-price">{book.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">북마크된 책이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
