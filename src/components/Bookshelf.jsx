import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  { id: 'depression', image: 우울Image },
  { id: 'anger', image: 분노Image },
  { id: 'anxiety', image: 불안Image },
  { id: 'loneliness', image: 외로움Image },
  { id: 'jealousy', image: 질투Image },
  { id: 'happiness', image: 행복Image },
  { id: 'lethargy', image: 무기력Image },
  { id: 'love', image: 사랑Image },
  { id: 'accomplishment', image: 성취감Image },
];

function Bookshelf() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  });

  const handleBookClick = (id) => {
    navigate(`/recommend/${id}`);
  };

  return (
    <div
      className="bookshelf-section"
      data-aos="fade-right"
      data-aos-duration="2000"
      data-aos-easing="ease-out-back"
    >
      <div className="bookshelf">
        {books.map((book) => (
          <img
            key={book.id}
            src={book.image}
            alt={book.id}
            className="book"
            onClick={() => handleBookClick(book.id)}
          />
        ))}
        <img src={potImage} alt="pot" className="pot" />
      </div>
      <img src={shelfImage} alt="shelf" className="shelf-img" />
    </div>
  );
}

export default Bookshelf;
