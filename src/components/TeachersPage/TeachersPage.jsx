import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { userContext } from "../../userContext";
import ClassroomCard from "./card";
import Navbar from "../navbar";
import { Container, Grid, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { BACKEND_HOST_URL } from "../../config/default";
import Cookies from "js-cookie";

// const load = async (email) => {
//   const resp = await axios.get(`/api/users/courseList/${email}`);
//   //console.log(resp.data);
//   return(resp.data);
// }

const TeachersPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState(false);
  const history = useHistory();
  const { user, setUser } = useContext(userContext);

  const [resp, setResp] = useState([]);

  useEffect(() => {
    if (!user || !user.email) {
      history.push("/");
      return;
    }

    const getItems = async () => {
      try {
        setIsLoading(true);
        //const response = await axios.get(`${BACKEND_HOST_URL}/api/users/courseList/${user.email}`);
        const userInfo = Cookies.get("userInfo");
        
        const token = JSON.parse(userInfo).token;
        // console.log(JSON.parse(userInfo).token);
        // console.log(userInfo.token);
          // const  token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDcxMmFhNzdhZWM0NjkxNGMyZjU3YSIsImlhdCI6MTY0ODg5NjMwOSwiZXhwIjoxNjQ4OTgyNzA5fQ.qFKyesB1Z9wzjng8G2bYVn5prkC4EoT_FJLRhdouGnU";
        const config = { headers: { Authorization: token ,},};
        // console.log(config);
        // console.log(token);
        const response1 = await axios.get(`${BACKEND_HOST_URL}/api/getClasses` , config);
        if (response1.status === 400) {
          console.log("error occured here ");
          setPermission(true);
        } else {
          console.log("no error occured here")
          setResp(response1.data);
          setIsLoading(false);
        }
      } catch (e) {
        // setPermission(true);
        console.log("error occured  ");
        console.log(e);
      }
    };

    // if (response.data.status === 200) {

    getItems();
  }, [user]);

  console.log(resp)

  //console.log(resp);

  return (
    <React.Fragment>
      <Navbar />
      <Box style={{ margin: "30px" }}>
        <Grid container spacing={2}>
          {!isLoading ? (
            // resp.courses.length && resp.courses.map((item) => (
            //   <Grid key={item.id} item xs={12} sm={6} md={6} lg={3}>
            //     <ClassroomCard item={item} />
            //   </Grid>))
            resp && resp.length ? (
              resp.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={6} lg={3}>
                  <ClassroomCard item={item} />
                </Grid>
              ))
            ) : (
              <Alert severity="info" style={{ width: "100%" }}>
                No classes found!!
              </Alert>
            )
          ) : (
            <p>Loading</p>
          )}
        </Grid>
        <Grid container spacing={2}>
          {permission && (
            <Alert severity="info" style={{ width: "100%" }}>
                Permission not given , Try Login again with proper permissions !!
            </Alert>
            // <p>
            //   No permission , Try login again and make sure ticking the
            //   permissions required
            // </p>
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default TeachersPage;
