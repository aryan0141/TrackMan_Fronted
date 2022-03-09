import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import ClassroomNames from "./ClassroomSettings";
import { TailSpin } from "react-loader-spinner";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  vertiHoriCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    backgroundColor: "white",
    padding: "15px",
    boxShadow: "1px 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "3px",
  },
});

const Analytics = () => {
  const classes = useStyles();
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(userContext);
  const [resp, setResp] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          // `/api/teachers/teachersClass/${courseId}`
          `/api/users/teachersClass/${courseId}/${user.email}/${user.accessToken}`
          //`/api/teachers/teachersClass/136844541806`
        );
        //136844541806
        setResp(response.data);
        setStudentsData(response.data.StudentsData);
        setIsLoading(false);
      } catch (e) {
        console.log("error occured  ", e);
      }
    };

    getItems();
  }, []);


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
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={12} xm={12}>
              {!isLoading ? (
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
                  {resp.name}
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  color="white"
                  style={{
                    bottom: "0px",
                    left: "15px",
                    position: "absolute",
                    fontWeight: "bold",
                  }}
                >
                  <TailSpin heigth="35" width="35" color="white" />
                </Typography>
              )}
            </Grid>
            <Grid item lg={8} md={8} sm={12} xm={12}></Grid>
          </Grid>
        </Box>
        <FileUploader courseId={courseId}/>
        <Grid style={{ marginTop: "40px", marginBottom: "40px"}} container spacing={2}>
          <Grid item lg={3} md={6} sm={12}>
            <Box
              style={{ borderLeft: `3px solid ${orange[500]}` }}
              className={classes.cards}
            >
              {!isLoading ? (
                <DetailCards name={"Total Time"} data={resp.totalDuration > 180 ? `${parseInt((resp.totalDuration)/60)}hrs ${parseInt((resp.totalDuration)%60)}mins` : `${parseInt((resp.totalDuration))}mins`}  />
              ) : (
                <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
              )}
            </Box>
          </Grid>
          <Grid item lg={3} md={6}>
            <Box
              style={{ borderLeft: `3px solid ${blue[500]}` }}
              className={classes.cards}
            >
              {!isLoading ? (
                <DetailCards
                  name={"Students Enrolled"}
                  data={resp.StudentsData.length}
                />
              ) : (
                <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
              )}
            </Box>
          </Grid>
          <Grid item lg={3} md={6}>
            <Box
              style={{ borderLeft: `3px solid ${amber[500]}` }}
              className={classes.cards}
            >
              {!isLoading ? (
                <DetailCards name={"Total Classes"} data={resp.totalClasses} />
              ) : (
                <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
              )}
            </Box>
          </Grid>
        </Grid>

        {/* .................................................................................................... */}

        <Typography variant="h5" color="textSecondary">
          Classroom Settings
        </Typography>

          <ClassroomNames data={resp} loading={isLoading} />

        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginTop: "30px" }}
        >
          Students Data
        </Typography>
        {!isLoading ? (
          <StudentsTable resp={resp} studentsData={studentsData} />
        ) : (
          <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Analytics;
