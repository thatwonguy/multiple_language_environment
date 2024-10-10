import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("Error response:", errorMessage);
      return;
    }

    const data = await res.json();
    setResponse(data);
  };

  // Floating hearts effect
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerText = '❤️'; // Heart emoticon
      document.body.appendChild(heart);

      const x = Math.random() * window.innerWidth;
      heart.style.left = `${x}px`;

      // Set a random animation duration for each heart
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration between 3s and 5s

      // Remove heart after 5 seconds
      setTimeout(() => {
        heart.remove();
      }, 5000); // Remove heart after 5 seconds
    };

    const interval = setInterval(createHeart, 500); // Create a heart every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Multi-Programming Language Full Stack Demo </h1>
        <form onSubmit={handleSubmit} className="App-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message"
            className="App-input"
          />
          <button type="submit" className="App-button">Send ❤️</button>
        </form>
        <h2>Description:</h2>
        <div className="App-description">
          <p>
            This application demonstrates multi-language communication using Python, C#, and Java,
            orchestrated by FastAPI and served with Nginx as a reverse proxy. The frontend is built 
            using React, providing an interactive interface for users.
          </p>
        </div>
        <h2>Response:</h2>
        <div className="App-response">
          <p>{response["C# Output"]}</p>
          <p>{response["Java Output"]}</p>
          <p>{response["Python Output"]}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
