import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';  
import LoginForm from './LoginForm'; 
import AdminPage from './AdminPage'; 

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        navigate('/admin');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLoginClick = () => {
    setShowLogin(true);
  }

  const handleLogin = async (username, password) => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log('Login successful');
      navigate('/admin'); // Navigate to the admin page on successful login
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="App">
        <Header
            isAuthenticated={isAuthenticated}
            handleLoginClick={handleLoginClick}
            handleLoginFormSubmit={handleLogin} // Pass handleLogin as a prop
        />
        {showLogin ? <LoginForm handleLogin={handleLogin} /> : null}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;






