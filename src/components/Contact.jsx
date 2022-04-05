import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "./navbar";

const Contact = () => {
  return (
    <Fragment>
      <Navbar />

      <Container
        style={{
          textAlign: "left",
          marginTop: 40,
        }}
      >
        <Typography variant="h4">Mentor's Info</Typography>
        <Box>
          <Typography variant="h6">Name: Dr. Sumit Kalra</Typography>
          <Typography variant="h6">Email: sumitk@iitj.ac.in</Typography>
          <Typography variant="h6">Contact: -</Typography>
        </Box>
        <br />
        <Typography variant="h4">Developer's Info</Typography>
        <Box>
          <Typography variant="h6">Name: Aryan Garg</Typography>
          <Typography variant="h6">Email: garg.10@iitj.ac.in</Typography>
          <Typography variant="h6">Contact: 8824879606</Typography>
        </Box>
        <br />
        <Box>
          <Typography variant="h6">Name: Ayush Shukla</Typography>
          <Typography variant="h6">Email: shukla.8@iitj.ac.in</Typography>
          <Typography variant="h6">Contact: 8765432037</Typography>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Contact;
