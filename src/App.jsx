import React from 'react'
import Header from './components/Header';
import Mainpage from './pages/Mainpage';
import Mypages from './pages/Mypage';
import './App.css';
import LankingPage from './Rank/RankingPage';
import LoginPage from './components/LoginPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Mainpage />
      {/* <Mypages /> */}
      {/* <LankingPage /> */}
    </>

    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;