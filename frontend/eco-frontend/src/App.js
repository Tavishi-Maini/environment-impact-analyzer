import React, { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("❌ Could not fetch score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "green";
    if (score >= 40) return "orange";
    return "red";
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

      {loading && <p>⏳ Analyzing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>{response.message}</h2>
          <p style={{ fontWeight: "bold", color: getScoreColor(response.score) }}>
            Score: {response.score}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
