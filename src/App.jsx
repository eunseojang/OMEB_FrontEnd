import './App.css';
import Main from './components/Main';
import Mainpage from './pages/Mainpage';
import Mypages from './pages/Mypage';
import RankingPage from './Rank/RankingPage';
import DetailPage from './Detail/DetailPage';
import LoginPage from './pages/LoginPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Path="/" element={<Main />}>
          <Route index element={<Mainpage />} />
          <Route path="Mypages" element={<Mypages />} />
          <Route path="Ranking" element={<RankingPage />} />
          <Route path="Detail/:bookId" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
