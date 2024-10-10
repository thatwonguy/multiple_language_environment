import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:8000/', {  // URL should match the FastAPI endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }), // This sends { "input": "your input value" }
    });

    if (!res.ok) {
      // Handle error response
      const errorMessage = await res.text();
      console.error("Error response:", errorMessage);
      return;
    }

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="App">
      <h1>Multi-Language Communication</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
      <h2>Response:</h2>
      <p>{response["C# Output"]}</p>
      <p>{response["Java Output"]}</p>
      <p>{response["Python Output"]}</p>
    </div>
  );
}

export default App;
