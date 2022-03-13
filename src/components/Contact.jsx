import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <Fragment>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <Typography variant="h5">Name: Aryan Garg</Typography>
        <Typography variant="h5">Email: garg.10@iitj.ac.in</Typography>
        <Typography variant="h5">Contact: 8824879606</Typography>
        <br />
        <Typography variant="h5">Name: Ayush Shukla</Typography>
        <Typography variant="h5">Email: shukla.8@iitj.ac.in</Typography>
        <Typography variant="h5">Contact: 8765432037</Typography>
      </div>
    </Fragment>
  );
};

export default Contact;
