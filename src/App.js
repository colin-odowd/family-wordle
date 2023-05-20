import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';  
import LoginForm from './LoginForm'; 
import AdminPage from './AdminPage'; 

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA9C7Ywxndo1U08ugJ6gq8rHNkoBrNkIwo",
    authDomain: "family-wordle.firebaseapp.com",
    projectId: "family-wordle",
    storageBucket: "family-wordle.appspot.com",
    messagingSenderId: "82959145718",
    appId: "1:82959145718:web:97c49504a1a7e87464aad7",
    measurementId: "G-SXH0R8QG90"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function HomePage({ setIsAuthenticated, isAuthenticated }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (username, password) => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      setIsAuthenticated(true);
      navigate('/admin');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
        <Header
            isAuthenticated={isAuthenticated}
            handleLoginFormSubmit={handleLogin}
        />
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' || false
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin" element={<AdminPage isAuthenticated={isAuthenticated}  />} />
      </Routes>
    </Router>
  );
}

export default App;
