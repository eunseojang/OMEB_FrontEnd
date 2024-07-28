import React from 'react'
import './App.css'
import LoginPage from './components/LoginPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App