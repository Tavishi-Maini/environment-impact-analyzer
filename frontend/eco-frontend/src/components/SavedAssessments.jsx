import { Card, CardContent, Typography } from "@mui/material";

function SavedAssessments({ saved, getScoreColor }) {
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
          {item.results.map((res, j) => (
            <Card key={j} className="card">
              <CardContent>
                <Typography variant="h6">{res.product}</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: getScoreColor(res.score) }}>
                  Score: {res.score}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SavedAssessments;
