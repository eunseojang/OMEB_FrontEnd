import React, { useEffect } from "react"; // Import useEffect from React
import "./DetailPage.css";
import BookSection from "./Booksection";
import Review from "./Review";

const DetailPage = () => {
  // Use useEffect to scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className="detail-page">
        <BookSection />
      </div>
      <Review />
    </>
  );
};

export default DetailPage;
