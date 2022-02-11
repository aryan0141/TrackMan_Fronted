import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useState } from "react";

const useStyles = makeStyles({
  vertiHoriCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const DetailCards = ({ data, name }) => {

  const classes = useStyles();
  return (
    <Box
    >
      <Typography
        color="textSecondary"
        variant="h6"
        style={{ fontSize: "1.1rem" }}
      >
        {name}
      </Typography>
      <Typography
          variant="h5"
          style={{ fontWeight: "400", fontSize: "1.8rem", color: "#232b2b" }}
        >
          {data}
        </Typography>
    </Box>
  );
};
