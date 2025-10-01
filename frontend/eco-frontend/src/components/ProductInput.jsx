import { TextField } from "@mui/material";

function ProductInput({ products, handleChange }) {
  return (
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
  );
}

export default ProductInput;
