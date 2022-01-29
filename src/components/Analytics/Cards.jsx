import { Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { Box } from '@mui/system';
import React from 'react';

const useStyles = makeStyles({
  vertiHoriCenter: {
      display: "flex",
      // height: "90vh",
      // backgroundColor: "purple",
      justifyContent: "center",
      alignItems: "center",
  },
  cards: {
    padding: "10px",
    backgroundColor: "white",
    // margin: "0px 30px",
    padding: "15px",
    boxShadow: "1px 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "3px",
  },
  btn: {
    color: "pink",
    backgroundColor: "blue",
    margin: "auto",
    "&:hover": {
      backgroundColor: "purple",
    },
  },
  title: {
    color: "blue",
    textDecoration: "underline",
  },
  field: {
    marginBottom: 21,
    marginLeft: 21,
  },
});

export const DetailCards = ({props}) => {
  const classes = useStyles();
  return (
        <Box style={{borderLeft: `3px solid ${props.borderColor}`}} className={classes.cards}>
          <Typography color="textSecondary" variant='h6' style={{fontSize: "1.1rem"}}>{props.heading}</Typography>
          <Typography variant='h5' style={{fontWeight: "400", fontSize: "1.8rem", color: "#232b2b"}}>{props.weight}</Typography>
        </Box>
  );
};
