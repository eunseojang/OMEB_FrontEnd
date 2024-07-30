import { useEffect } from 'react';
import './Bookshelf.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import shelfImage from '../assets/선반.png';
import potImage from '../assets/화분.png';

import 우울Image from '../assets/emotion/우울.png';
import 분노Image from '../assets/emotion/분노.png';
import 불안Image from '../assets/emotion/불안.png';
import 외로움Image from '../assets/emotion/외로움.png';
import 질투Image from '../assets/emotion/질투.png';
import 행복Image from '../assets/emotion/행복.png';
import 무기력Image from '../assets/emotion/무기력.png';
import 사랑Image from '../assets/emotion/사랑.png';
import 성취감Image from '../assets/emotion/성취감.png';

const books = [
  { id: '우울', image: 우울Image },
  { id: '분노', image: 분노Image },
  { id: '불안', image: 불안Image },
  { id: '외로움', image: 외로움Image },
  { id: '질투', image: 질투Image },
  { id: '행복', image: 행복Image },
  { id: '무기력', image: 무기력Image },
  { id: '사랑', image: 사랑Image },
  { id: '성취감', image: 성취감Image },
];

function Bookshelf() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div
      className="bookshelf-section"
      data-aos="fade-right"
      data-aos-duration="2000"
      data-aos-easing="ease-out-back"
    >
      <div className="bookshelf">
        {books.map((book) => (
          <img key={book.id} src={book.image} alt={book.id} className="book" />
        ))}
        <img src={potImage} alt="pot" className="pot" />
      </div>
      <img src={shelfImage} alt="shelf" className="shelf-img" />
    </div>
  );
}

export default Bookshelf;
