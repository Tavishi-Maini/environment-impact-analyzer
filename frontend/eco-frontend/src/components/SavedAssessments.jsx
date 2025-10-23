// src/components/SavedAssessments.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./css/SavedAssessments.css";

const SavedAssessments = ({ saved, getScoreColor }) => {
  return (
    <div className="saved-section">
      <Typography variant="h5" className="section-title">
        🗂 Saved Assessments
      </Typography>

      {saved.map((item, i) => (
        <div key={i} className="saved-entry">
          <Typography variant="subtitle2" className="saved-date">
            {new Date(item.date).toLocaleString()}
          </Typography>

          <div className="saved-cards">
            {item.results.map((res, j) => (
              <Card key={j} className="saved-card">
                <CardContent>
                  <Typography variant="h6">{res.product}</Typography>
                  <Typography
                    variant="body1"
                    style={{ color: getScoreColor(res.score) }}
                  >
                    Score: {res.score}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedAssessments;
