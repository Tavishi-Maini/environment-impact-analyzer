// src/components/Results.js
import React from "react";
import Card from "./Card";
import { Box } from "@mui/material";

const Results = ({ results, getScoreColor }) => {
  if (!results.length) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, flexWrap: "wrap" }}>
      {results.map((res, i) => (
        <Card
          key={i}
          title={res.product}
          score={res.score}
          message={res.message}
          color={getScoreColor(res.score)}
        />
      ))}
    </Box>
  );
};

export default Results;
