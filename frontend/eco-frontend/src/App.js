import React, { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product })
      });
      const data = await res.json();
      console.log(data);  // debug
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ message: "Error connecting to backend" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Environmental Impact Analyzer 🌱</h1>
      <input
        type="text"
        placeholder="Enter product name..."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Assess
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>{response.message}</h2>
          <p>Score: {response.score}</p>
        </div>
      )}
    </div>
  );
}

export default App;
