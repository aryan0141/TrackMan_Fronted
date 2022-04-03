import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../userContext";
import FileUploader from "./FileUploader";
import Navbar from "../navbar";
import StudentsTable from "./StudentsTable";
import { useHistory } from "react-router-dom";
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
import Cookies from "js-cookie";
import { BACKEND_HOST_URL } from "../../config/default";

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
  // const navigate=useNavigate()
  const history = useHistory();
  const classes = useStyles();
  // const { courseId } = useParams();
  const { courseName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(userContext);
  console.log(user);
  const [resp, setResp] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    if (!Cookies.get("userInfo")) {
      history.push("/");
      return;
    }

    const userInfo = Cookies.get("userInfo");
    const token = JSON.parse(userInfo).token;
    const config = { headers: { Authorization: token } };

    const getItems = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          // `/api/teachers/teachersClass/${courseId}`

          // `${BACKEND_HOST_URL}/api/users/teachersClass/${courseId}/${user.email}/${user.accessToken}`

          `${BACKEND_HOST_URL}/api/getClass/${courseName}`,
          config
          //`/api/teachers/teachersClass/136844541806`
        );
        // console.log(response)
        //136844541806
        console.log(response.data);
        return;
        setResp(response.data);
        setStudentsData(response.data.StudentsData);

        setIsLoading(false);
      } catch (e) {
        const res1 = await axios.get(
          `${BACKEND_HOST_URL}/api/getClass/${courseName}`
          //`${BACKEND_HOST_URL}/api/users/createCompleteClass/${user.email}/${courseId}/${courseName}/${user.access_token}`
        );
        if (res1.data.status === 200) {
          setTimeout(() => {
            // history.push(
            //   `/api/users/teachersClass/${courseId}/${user.email}/${user.accessToken}`
            // );
            history.go(0);
          }, 200);
        }
        //console.log("error occured here ", e);
      }
    };

    if (user && user.email) {
      const getItems = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${BACKEND_HOST_URL}/api/getClass/${courseName}`,config
            // `${BACKEND_HOST_URL}/api/users/teachersClass/${courseId}/${user.email}/${user.accessToken}`
            //`/api/teachers/teachersClass/136844541806`
          );
          // console.log(response)
          //136844541806
          setResp(response.data);
          setStudentsData(response.data.StudentsData);
          setIsLoading(false);
        } catch (e) {
          const res1 = await axios.get(
            `${BACKEND_HOST_URL}/api/getClass/${courseName}`,config
            //`${BACKEND_HOST_URL}/api/users/createCompleteClass/${user.email}/${courseId}/${courseName}/${user.access_token}`
          );
          if (res1.data.status === 200) {
            console.log("class created shyd");
            setTimeout(() => {
              // history.push(
              //   `/api/users/teachersClass/${courseId}/${user.email}/${user.accessToken}`
              // );
              history.go(0);
            }, 200);
          }
          //console.log("error occured here ", e);
        }
      };

      getItems();
    }
  }, [user]);

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
        {/* {resp && resp.fileNames && (
          <FileUploader courseId={courseId} resp={resp} />
        )} */}
        {/* <FileUploader courseId={(courseId, resp)} /> */}
        <Box style={{ marginTop: "40px", marginBottom: "40px" }}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={12}>
              <Box
                style={{ borderLeft: `3px solid ${orange[500]}` }}
                className={classes.cards}
              >
                {!isLoading ? (
                  <DetailCards
                    name={"Total Time"}
                    data={
                      resp.totalDuration > 180
                        ? `${parseInt(resp.totalDuration / 60)}hrs ${parseInt(
                            resp.totalDuration % 60
                          )}mins`
                        : `${parseInt(resp.totalDuration)}mins`
                    }
                  />
                ) : (
                  <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
                )}
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
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
            <Grid item lg={3} md={6} sm={12}>
              <Box
                style={{ borderLeft: `3px solid ${amber[500]}` }}
                className={classes.cards}
              >
                {!isLoading ? (
                  <DetailCards
                    name={"Total Classes"}
                    data={resp.totalClasses}
                  />
                ) : (
                  <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

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
