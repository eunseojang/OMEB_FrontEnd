import { useState } from 'react';
import './BookFinder.css'; // Ensure this import matches the actual file name

function BookFinder() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add the logic to search books
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="bookfinder-container">
      <div className="bookfinder-header">
        <h1>책 신청하기</h1>
        <p>마음에 드시는 책이 없으신가요?</p>
      </div>
      <div className="bookfinder-search-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
      <div className="bookfinder-explore">
        <button className="explore-button">Product categories</button>
        <button className="explore-button">Hero section</button>
        <button className="explore-button">Contact form</button>
        <button className="explore-button">Ecommerce dashboard</button>
      </div>
    </div>
  );
}

export default BookFinder;
