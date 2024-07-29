import Bookshelf from '../components/Bookshelf';
import './Mainpage.css';

const sections = [
  { title: '#리뷰 많은 책', books: [] },
  { title: '#별점 높은 책', books: [] },
  { title: '#북마크가 많이 된 책', books: [] },
];

function Mainpage() {
  return (
    <>
      <div className="mainpage">
        <h2>#감정 기반 추천</h2>
        <Bookshelf />
        {sections.map((section, index) => (
          <div key={index} className="section">
            <h2>{section.title}</h2>
            <div className="book-list">
              {section.books.map((book, idx) => (
                <div key={idx} className="book-item">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">{book.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Mainpage;
