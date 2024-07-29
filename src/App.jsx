import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Mainpage from './pages/Mainpage';
import Mypages from './pages/Mypage';
import './App.css';
import LankingPage from './Rank/RankingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Path="/" element={<Main />}>
          <Route index element={<Mainpage />} />
          <Route path="Mypages" element={<Mypages />} />
          <Route path="LankingPage" element={<LankingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
