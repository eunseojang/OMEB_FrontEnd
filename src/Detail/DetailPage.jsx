import React from "react";
import "./DetailPage.css";
import BookSection from "./Booksection";
import Review from "./Review";
const DetailPage = () => {
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
