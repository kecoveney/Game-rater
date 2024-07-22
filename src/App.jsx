// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Reviews from './pages/Reviews';
import SubmitReview from './pages/SubmitReview';
import EditReview from './pages/EditReview';
import NavBar from './components/NavBar';
import TopRecommendedGames from './pages/TopRecommendedGames';
import AdminPanel from './pages/AdminPanel';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar user={user} />
        <AudioPlayer />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={user ? <Account user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/reviews" element={user ? <Reviews user={user} /> : <Navigate to="/login" />} />
          <Route path="/top-recommended" element={<TopRecommendedGames />} />
          <Route path="/admin" element={user && user.isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
          <Route path="/submit" element={user ? <SubmitReview user={user} /> : <Navigate to="/login" />} />
          <Route path="/edit-review/:id" element={user ? <EditReview /> : <Navigate to="/login" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
