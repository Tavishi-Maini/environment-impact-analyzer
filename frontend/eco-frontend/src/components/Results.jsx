import { Card, CardContent, Typography, Box } from "@mui/material";

function Results({ results, getScoreColor }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, flexWrap: "wrap" }}>
      {results.map((res, i) => (
        <Card key={i} className="card" sx={{ border: `2px solid var(--secondary-green)` }}>
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
  );
}

export default Results;
