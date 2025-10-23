// src/components/Results.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./css/Results.css";

const Results = ({ results, getScoreColor }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="results-section">
      <Typography variant="h5" className="section-title">
        🌍 Current Assessment Results
      </Typography>
      <div className="results-grid">
        {results.map((res, i) => (
          <Card key={i} className="result-card">
            <CardContent>
              <Typography variant="h6" className="product-name">
                {res.product}
              </Typography>
              <Typography
                variant="body1"
                className="score"
                style={{ color: getScoreColor(res.score) }}
              >
                Score: {res.score}
              </Typography>
              <Typography variant="body2" className="message">
                {res.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
