// src/components/SavedAssessments.js
import React from "react";
import Card from "./Card";
import { Typography, Box } from "@mui/material";

const SavedAssessments = ({ saved, getScoreColor }) => {
  return (
    <div className="saved-section">
      <Typography variant="h5" gutterBottom>
        🗂 Saved Assessments
      </Typography>
      {saved.map((item, i) => (
        <div key={i}>
          <Typography variant="subtitle2">
            {new Date(item.date).toLocaleString()}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            {item.results.map((res, j) => (
              <Card
                key={j}
                title={res.product}
                score={res.score}
                color={getScoreColor(res.score)}
              />
            ))}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default SavedAssessments;
