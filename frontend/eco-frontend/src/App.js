import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

function App() {
  const [products, setProducts] = useState(["", ""]);
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/saved");
        if (!res.ok) throw new Error("Failed to fetch saved assessments");
        const data = await res.json();
        setSaved(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSaved();
  }, []);

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

      await fetch("http://127.0.0.1:5000/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const savedRes = await fetch("http://127.0.0.1:5000/api/saved");
      const savedData = await savedRes.json();
      setSaved(savedData);
    } catch (err) {
      setError("❌ Could not fetch scores or save assessment.");
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
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Environmental Impact Analyzer 🌱
      </Typography>

      <div className="input-container">
        {products.map((product, i) => (
          <TextField
            key={i}
            label={`Product ${i + 1}`}
            variant="outlined"
            value={product}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Assess
      </Button>

      {loading && <Typography sx={{ mt: 2 }}>⏳ Analyzing...</Typography>}
      {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, flexWrap: "wrap" }}>
        {results.map((res, i) => (
          <Card key={i} className="card">
            <CardContent>
              <Typography variant="h6">{res.product}</Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: getScoreColor(res.score) }}
              >
                Score: {res.score}
              </Typography>
              <Typography variant="body2">{res.message}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {saved.length > 0 && (
        <div className="saved-section">
          <Typography variant="h5" gutterBottom>
            🗂 Saved Assessments
          </Typography>
          {saved.map((item, i) => (
            <div key={i}>
              <Typography variant="subtitle2">
                {new Date(item.date).toLocaleString()}  {/* now will work */}
              </Typography>
              {item.results.map((res, j) => (
                <Card key={j} className="card">
                  <CardContent>
                    <Typography variant="h6">{res.product}</Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: getScoreColor(res.score) }}
                    >
                      Score: {res.score}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
