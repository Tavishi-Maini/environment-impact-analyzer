import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Typography } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductInput from "./components/ProductInput";
import Results from "./components/Results";
import SavedAssessments from "./components/SavedAssessments";

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
  if (score >= 70) return "var(--primary-green)";
  if (score >= 40) return "var(--accent-orange)";
  return "var(--accent-red)";
};


  return (
    <div>
      <Header title="Environment Impact Analyzer 🌱"/>
      <div className="container">

        <ProductInput products={products} handleChange={handleChange} />

        <div className="centerButton">
        <Button variant="contained" color="primary" onClick={handleSubmit} >
          Assess
        </Button>
        </div>

        {loading && <Typography className="loading">⏳ Analyzing...</Typography>}
        {error && <Typography className="error" sx={{ color: "var(--accent-red)" }}>{error}</Typography>}


        <Results results={results} getScoreColor={getScoreColor} />

        {saved.length > 0 && (
          <SavedAssessments saved={saved} getScoreColor={getScoreColor} />
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
