import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState(["", ""]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = value;
    setProducts(newProducts);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("❌ Could not fetch scores. Please try again.");
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

      {products.map((product, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Enter product ${i + 1}`}
          value={product}
          onChange={(e) => handleChange(i, e.target.value)}
          style={{ padding: "10px", width: "200px", marginRight: "10px" }}
        />
      ))}
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Assess
      </button>

      {loading && <p>⏳ Analyzing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {results.map((res, i) => (
          <div key={i}>
            <h3>{res.message}</h3>
            <p style={{ fontWeight: "bold", color: getScoreColor(res.score) }}>
              Score: {res.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
