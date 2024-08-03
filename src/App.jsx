import './App.css';
import Main from './components/Main.jsx';
import Mainpage from './pages/Mainpage';
import Mypages from './pages/Mypage';
import RankingPage from './Rank/RankingPage';
import DetailPage from './Detail/DetailPage';
import AuthCallback from './pages/AuthCallback.jsx';
import LoginPage from './pages/LoginPage.jsx';

import RecommendPage from './pages/RecommendPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingupPage from './pages/SingupPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Path="/" element={<Main />}>
          <Route index element={<Mainpage />} />
          <Route path="Mypages" element={<Mypages />} />
          <Route path="Ranking" element={<RankingPage />} />
          <Route path="recommend/:id" element={<RecommendPage />} />
          <Route path="Detail/:bookId" element={<DetailPage />} />
        </Route>
        {/* 로그인 창은 헤더 제거 함 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingupPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
