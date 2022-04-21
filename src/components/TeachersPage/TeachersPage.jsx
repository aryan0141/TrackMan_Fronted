import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { userContext } from "../../userContext";
import ClassroomCard from "./card";
import Navbar from "../navbar";
import {
  Container,
  Grid,
  Alert,
  IconButton,
  Typography,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { BACKEND_HOST_URL } from "../../config/default";
import Cookies from "js-cookie";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAlert } from "react-alert";

const TeachersPage = () => {
  const alert = useAlert();
  const userInfo = Cookies.get("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : null;
  const config = { headers: { Authorization: token } };

  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState(false);
  const history = useHistory();
  const { user, setUser } = useContext(userContext);

  const [resp, setResp] = useState([]);

  const [showInput, setShowInput] = useState(false);
  const [className, setClassName] = useState("");
  const [classNameError, setClassNameError] = useState(false);

  async function handleSubmit() {
    if (className === "") {
      setClassNameError(true);
      return;
    }
    // var classFound = false;
    // for (var i = 0; i < resp.length; i++) {
    //   if (className.toLowerCase() === resp[i].name) {
    //     classFound = true;
    //   }
    // }
    // if (classFound) {
    //   alert.error("Class with that name already exists");
    //   setClassName("");
    //   return;
    // }

    const createClass = {
      courseName: className,
      teacherName: JSON.parse(userInfo).email,
    };
    console.log(createClass, config);
    const newClass = await axios.post(
      `${BACKEND_HOST_URL}/api/createClass`,
      { createClass },
      config
    );
    resp.push(newClass.data);
    setResp([...resp]);
    setClassName("");
  }

  function handleClick() {
    setShowInput(!showInput);
  }

  async function deleteClassroom(className) {
    if (window.confirm("Are you sure to delete that classroom?") == true) {
      const res = await axios.get(
        `${BACKEND_HOST_URL}/api/deleteClass/${className}`,
        config
      );
      if(res.status === 200) {
        resp.splice(resp.findIndex(a => a.name === className) , 1);
        setResp([...resp]);
      } else {
        alert("Some error occured! Please try again.")
      }
    }
  }

  useEffect(() => {
    if (!user || !user.email) {
      history.push("/");
      return;
    }

    if (!user.isActivated) {
      history.push("/");
      return;
    }

    const getItems = async () => {
      try {
        setIsLoading(true);
        const userInfo = Cookies.get("userInfo");
        const token = JSON.parse(userInfo).token;
        const config = { headers: { Authorization: token } };
        const response1 = await axios.get(
          `${BACKEND_HOST_URL}/api/getClasses`,
          config
        );
        if (response1.status === 400) {
          setPermission(true);
        } else {
          setResp(response1.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log("error occured  ");
        console.log(e);
      }
    };

    getItems();
  }, [user]);

  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ display: "flex", margin: "10px 0px" }}>
        <IconButton onClick={handleClick}>
          <AddCircleOutlineIcon sx={{ fontSize: 40 }} color="primary" />
        </IconButton>
        {showInput ? (
          <Box sx={{ margin: "auto 10px" }}>
            <FormControl sx={{ marginRight: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Enter Class Name"
                variant="outlined"
                size="small"
                error={classNameError}
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enter
            </Button>
          </Box>
        ) : null}
      </Container>
      <Box style={{ margin: "30px" }}>
        <Grid container spacing={2}>
          {!isLoading ? (
            resp && resp.length ? (
              resp.map((item) => (
                <Grid key={item._id} item xs={12} sm={6} md={6} lg={3}>
                  <ClassroomCard
                    item={item}
                    onChange={(data) => deleteClassroom(data)}
                  />
                </Grid>
              ))
            ) : (
              <Box style={{ width: "100%" }}>
                <Alert severity="info" style={{ width: "100%" }}>
                  No classes found!!
                </Alert>
              </Box>
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
