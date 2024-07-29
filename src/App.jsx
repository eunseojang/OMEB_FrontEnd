import React from 'react'
import './App.css';
import Header from './components/Header';
import Mainpage from './pages/Mainpage';
import Mypages from './pages/Mypage';
import LankingPage from './Rank/RankingPage';
import LoginPage from './components/LoginPage.jsx'
import RecommendPage from './components/RecommendPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // <>
    //   <Header />
    //   <Mainpage />
    //   {/* <Mypages /> */}
    //   {/* <LankingPage /> */}
    // </>

    <Router>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;