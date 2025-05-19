import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
function Loading2() {
  return (
    <Box display="flex" justifyContent="center" py={5}>
      <CircularProgress />
    </Box>
  );
}

export default Loading2;
