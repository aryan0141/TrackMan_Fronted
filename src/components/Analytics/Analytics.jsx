import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext";
import FileUploader from "./FileUploader";
import Navbar from "../Navbar";
import StudentsTable from "./StudentsTable";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import { DetailCards } from "./Cards";
import { Box } from "@mui/system";
import { blue, green, orange, red } from "@mui/material/colors";
import { amber } from "@material-ui/core/colors";
import { Footer } from "../Footer";
import { Filters } from "./Filters";
// import img1 from "./../../img/booksVec.png";

const cardsDetails = [
  {
    heading: "Total Time",
    weight: "180 mins",
    borderColor: orange[500],
  },
  {
    heading: "Students Enrolled",
    weight: "93",
    borderColor: blue[500],
  },
  {
    heading: "Avg. Attendance",
    weight: "83/117",
    borderColor: amber[500],
  },
  {
    heading: "CP Score",
    weight: "73/100",
    borderColor: green[500],
  },
];

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(userContext);
  const [resp, setResp] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/teachers/teachersClass/136844541806`
        );
        setResp(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("error occured  ", e);
      }
    };

    getItems();
  }, []);

  console.log(resp.StudentsData);

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Box
          style={{
            backgroundColor: blue[600],
            borderRadius: "7px",
            height: "250px",
            margin: "50px 0px",
            position: "relative",
          }}
        >
          <Grid container>
            <Grid item lg={8} md={8} sm={12} xm={12}>
              <Typography
                variant="h4"
                color="white"
                style={{
                  bottom: "7px",
                  left: "15px",
                  position: "absolute",
                  fontWeight: "bold",
                }}
              >
                EEL4040: Computer Engineering
              </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xm={12}>
              {/* <img width="100%" src={img1} alt="" /> */}
            </Grid>
          </Grid>
        </Box>
        <FileUploader />
        {/* <DragDrop /> */}
        <Grid style={{marginTop: "40px",}} container spacing={2}>
          {cardsDetails.map((data, index) => (
            <Grid key={index} item lg={3} md={6} sm={12} xs={12}>
              <DetailCards props={data} />
            </Grid>
          ))}
        </Grid>
        <Filters />
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginTop: "30px" }}
        >
          Students Data
        </Typography>
        {!isLoading ? (
          <StudentsTable props={resp.StudentsData} />
        ) : (
          <Typography>Loading Data...</Typography>
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Analytics;
