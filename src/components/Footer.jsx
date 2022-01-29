import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";

export const Footer = () => {
  return (
    <Box
      style={{
        padding: "1px",
        backgroundColor: blue[500],
        color: "white",
        width: "100%",
        // position: "absolute",
        left: 0,
        bottom: 0,
        textAlign: "center",
      }}
    >
      <p>Copyright Trackman 2022 | All Rights Reserved</p>
    </Box>
  );
};
