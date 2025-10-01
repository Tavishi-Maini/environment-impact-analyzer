// src/components/Card.js
import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import "./css/Card.css";

const Card = ({ title, score, message, color }) => {
  return (
    <MuiCard className="card">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" style={{ fontWeight: "bold", color }}>
          Score: {score}
        </Typography>
        {message && <Typography variant="body2">{message}</Typography>}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
