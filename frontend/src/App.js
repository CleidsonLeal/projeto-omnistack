import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Olá mundo !!!
        </p>
              
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
          <b
            className="App-link"
            href="https://www.instagram.com/rlmanutec/"
            target="_blank"
            rel="noopener noreferrer"
            >
              Instagram
            </b>
      </header>
    </div>
  );
}

export default App;
