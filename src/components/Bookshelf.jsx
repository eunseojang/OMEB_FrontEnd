import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookshelf.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import t1 from '../assets/books/b_9.png';
import t2 from '../assets/books/b_8.png';
import t3 from '../assets/books/b_7.png';
import t4 from '../assets/books/b_6.png';
import t5 from '../assets/books/b_5.png';
import t6 from '../assets/books/b_4.png';
import t7 from '../assets/books/b_3.png';
import t8 from '../assets/books/b_2.png';
import t9 from '../assets/books/b_1.png';

const books = [
  { id: 'jealousy', image: t1 },
  { id: 'loneliness', image: t2 },
  { id: 'anxiety', image: t3 },
  { id: 'anger', image: t4 },
  { id: 'accomplishment', image: t5 },
  { id: 'happiness', image: t6 },
  { id: 'depression', image: t7 },
  { id: 'love', image: t8 },
  { id: 'lethargy', image: t9 },
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
          <div
            key={book.id}
            className="book-container"
            onClick={() => handleBookClick(book.id)}
          >
            <img src={book.image} alt={book.id} className="book" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
