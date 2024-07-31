import React from "react"
import { useEffect, useState } from "react"
import "./RecommendPage.css"
import Bookshelf from "../components/Bookshelf";
import open_book from "../assets/recommend/open_book.png"
import close from "../assets/recommend/close.png"
import 분노_label from "../assets/recommend/분노_label.png"
import book_cover from "../assets/recommend/book_cover(ex).jpeg"
import arrow_back from "../assets/recommend/arrow_back.png"
import arrow_forward from "../assets/recommend/arrow_forward.png"


const RecommendPage = ({ id }) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false);
  }
  if (!isVisible) {
    return null;
  }

  return (
    <div className="recommend_back">
      <div className="recommend">

        {/* 책 형태 배경 */}
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
          <div className="arrow_back">
            <img src={arrow_back} alt="뒤로가기" />
          </div>

          {/* 책 상세 페이지 버튼 */}
          <button>책 보러가기</button>

        </div>
        
        {/* 오른쪽 페이지 */}
        <div className="right">

          {/* 창 닫기 */}
          <div className="close" onClick={handleClose}>
            <img src={close} alt="" />
          </div>

          {/* 앞으로 가기 */}
          <div className="arrow_forward">
            <img src={arrow_forward} alt="뒤로가기" />
          </div>

          {/* 리뷰 */}
          {/* 어떻게 가져와야 할 지 모르겠다 */}
          <div className="review">
            <p>
              I'm like some kind of supernova<br/>
              Watch out<br/>
              Look at me go<br/>
              재미 좀 볼 빛의 core<br/>
              So hot, hot<br/>
              문이 열려 서로의 존재를 느껴<br/>
              마치 discord<br/>
              날 닮은 너, 너 누구야? (Drop)<br/>
              사건은 다가와 ah, oh, ayy<br/>
              거세게 커져가 ah, oh, ayy<br/>
              That tick, that tick, tick bomb<br/>
              That tick, that tick, tick bomb<br/>
              감히 건드리지 못할 걸 (누구도 말이야)<br/>
              지금 내 안에선 su-su-su-supernova<br/>
              Nova<br/>
              Can't stop hyperstellar<br/>
              원초 그걸 찾아<br/>
              Bring the light of a dying star<br/>
              불러낸 내 우주를 봐 봐<br/>
              Supernova<br/>
              Ah, body bang<br/>
              Make it feel too right<br/>
            </p>
          </div>


        </div>


      </div>
    </div>

  );
};

export default RecommendPage;