import Main from "./components/Main";
import Mainpage from "./pages/Mainpage";
import Mypages from "./pages/Mypage";
import "./App.css";
import RankingPage from "./Rank/RankingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./Detail/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Path="/" element={<Main />}>
          <Route index element={<Mainpage />} />
          <Route path="Mypages" element={<Mypages />} />
          <Route path="Ranking" element={<RankingPage />} />
          <Route path="Detail/:bookId" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
