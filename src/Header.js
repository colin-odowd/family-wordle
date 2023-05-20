import React, { useState } from 'react';
import LoginForm from './LoginForm';

function Header({ isAuthenticated, handleLoginFormSubmit }) {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  return (
    <header className="App-header">
      <h1 className="App-title">Family Wordle</h1>
      {isAuthenticated ? null : (
        <>
          {!showLoginForm ? (
            <button className="App-button" onClick={handleLoginButtonClick}>
              Admin Login
            </button>
          ) : (
            <LoginForm handleLogin={handleLoginFormSubmit} />
          )}
        </>
      )}
    </header>
  );
}

export default Header;
