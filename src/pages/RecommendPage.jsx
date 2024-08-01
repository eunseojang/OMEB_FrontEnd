import React from 'react';
import { useEffect, useState } from 'react';
import './RecommendPage.css';
import open_book from '../assets/recommend/open_book.png';

import 무기력_label from '../assets/recommend/무기력_label.png';
import 분노_label from '../assets/recommend/분노_label.png';
import 불안_label from '../assets/recommend/불안_label.png';
import 사랑_label from '../assets/recommend/사랑_label.png';
import 성취감_label from '../assets/recommend/성취감_label.png';
import 외로움_label from '../assets/recommend/외로움_label.png';
import 우울_label from '../assets/recommend/우울_label.png';
import 질투_label from '../assets/recommend/질투_label.png';

import book_cover from '../assets/recommend/book_cover(ex).jpeg';


const RecommendPage = ({ id }) => {
  // 창 닫기
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false);
  };
  if (!isVisible) {
    return null;
  };

  // 좋아요 버튼 클릭 효과
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
            <img src={분노_label} alt="무기력" />
            <p>분노</p>
            {/* 선택한 책의 감정이 들어감
            <p>{id}</p> */}
          </div>
        </div>


        {/* 왼쪽 페이지 */}
        <div className="left">
          {/* 책 표지 */}
          <div className="book_cover">
            <img src={book_cover} alt="책표지" />
            {/* 리뷰한 책의 표지가 나타남
            <img src={img} alt="" /> */}
          </div>

          {/* 뒤로가기 */}
          <span className='material-icons'>chevron_left</span>

          {/* 책 상세 페이지 버튼 */}
          <button>책 보러가기</button>
        </div>


        {/* 오른쪽 페이지 */}
        <div className="right">
          
          {/* 창 닫기 */}
          <div className="close">
            <span className='material-icons' onClick={handleClose}>close</span>
          </div>

          {/* 앞으로 가기 */}
          <div className="chevron_right">
            <span className='material-icons'>chevron_right</span>
          </div>

          {/* 리뷰 */}
          {/* 어떻게 가져와야 할 지 모르겠다 */}
          <div className="review">
            <p>
              I'm like some kind of supernova<br />
              Watch out<br />
              Look at me go<br />
              재미 좀 볼 빛의 core<br />
              So hot, hot<br />
              문이 열려 서로의 존재를 느껴<br />
              마치 discord<br />
              날 닮은 너, 너 누구야? (Drop)<br />
              사건은 다가와 ah, oh, ayy<br />
              거세게 커져가 ah, oh, ayy<br />
              That tick, that tick, tick bomb<br />
              That tick, that tick, tick bomb<br />
              감히 건드리지 못할 걸 (누구도 말이야)<br />
              지금 내 안에선 su-su-su-supernova<br />
              Nova<br />
              Can't stop hyperstellar<br />
              원초 그걸 찾아<br />
              Bring the light of a dying star<br />
              불러낸 내 우주를 봐 봐<br />
              Supernova<br />
              Ah, body bang<br />
              Make it feel too right<br />
            </p>
          </div>

          {/* 버튼 */}
          <div className="btns">
            {/* 좋아요 버튼 */}
            <button className={`like ${isLiked ? 'active' : ''}`} onClick={handleLikeClick}>
              좋아요&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='material-icons'>favorite</span>
              {isLiked && <div className="particles">{generateParticles()}</div>}
            </button>
            {/* 추천받기 */}
            <button className='new'>
              추천받기&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='material-icons'>featured_play_list</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecommendPage;
