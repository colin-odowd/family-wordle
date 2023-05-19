import React from 'react';
import './App.css';

function App() {
  // Function to handle click event
  const handleLoginClick = () => {
    alert('Login Button Clicked!');
    // Here you'd typically navigate to the login page or open a login modal
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Family Wordle</h1>
        <button className="App-button" onClick={handleLoginClick}>Admin Login</button>
      </header>
      {/* Other elements go here */}
    </div>
  );
}

export default App;
