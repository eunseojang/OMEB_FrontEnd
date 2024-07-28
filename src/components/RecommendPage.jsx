import React from 'react'
import { useEffect, useState } from 'react'
import './RecommendPage.css'

const RecommendPage = () => {
  const [emotion, setEmotion] = useState("테스트 감정")

  useEffect(() => {

  })
  
  return (
    <div className="recommend">
      <div className="emotion">
        <p></p>
      </div>
    </div>
  );
};

export default RecommendPage;