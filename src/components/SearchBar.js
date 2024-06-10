import React from "react";
import { TextField, Box } from "@mui/material";

function SearchBar({ query, setQuery, search }) {
  return (
    <Box mb={4}>
      <TextField
        fullWidth
        label="Search here"
        variant="outlined"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
