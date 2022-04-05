import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import img1 from "./../../img/homepageImg.jpg";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { userContext } from "./../../userContext";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import { BACKEND_HOST_URL } from "../../config/default";
import Login from "./login";
import Signup from "./signup";

const useStyles = makeStyles({
  vertiHoriCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const Container = styled.div`
  display: flex;
  width: 100%;
  /* @media only screen and (max-width:480px){
        flex-direction: column;
        padding: 30px 20px;
    } */
`;

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();

  const { user, setUser } = useContext(userContext);
  const redirectFunction = () => {
    history.push("/teachersPage");
    /* window.location.href="/teachersPage"; */
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function handleClick(str) {
    if (str === "login") {
      if (showSignup) {
        setShowSignup(false);
      }
      setShowLogin(true);
    } else {
      if (showLogin) {
        setShowLogin(false);
      }
      setShowSignup(true);
    }
  }

  // Resend account activation link
  const resendActivationLink = async () => {
    try {
      const config = {
        headers: {
          Authorization: user?.token,
        },
      };
      await axios.get(
        `${BACKEND_HOST_URL}/auth/v2/send-activation-link`,
        config
      );
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  };



  if (user) {
    return (
      <React.Fragment>
        {!user.isActivated ? (
          <Alert style={{ margin: 20 }} severity="info">
            User account not verified.{" "}
            <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={resendActivationLink} className="resendActivationMail">
              {" "}
              Click here to resend activation link.
            </span>
          </Alert>
        ) : (
          <Alert style={{ margin: 20 }} severity="success">
            User account activated
          </Alert>
        )}
        <Container
          className={classes.vertiHoriCenter}
          style={{ height: "90vh" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "0px 10px" }}
            onClick={redirectFunction}
          >
            For Teachers
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "0px 10px" }}
          >
            For Students
          </Button>
        </Container>
      </React.Fragment>
    );
  }
  return (
    <Container>
      <Grid container>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          className={classes.vertiHoriCenter}
          // style={{ height: "84vh" }}
        >
          <Box
            sx={{
              lg: { textAlign: "center" },
              margin: "auto",
            }}
          >
            <Typography
              style={{
                color: "black",
                fontSize: "3.5rem",
                lineHeight: "3.5rem",
                marginLeft: "-10px",
              }}
            >
              Trackman
            </Typography>
            <Typography style={{ fontSize: "1.2rem" }} color="textSecondary">
              A complete application to get a track of your students.
            </Typography>
            <br />
            <Box>
              <Button
                onClick={() => handleClick("login")}
                variant="contained"
                color="primary"
                style={{ marginRight: "5px" }}
              >
                Login
              </Button>
              <Button
                onClick={() => handleClick("signup")}
                variant="contained"
                color="primary"
              >
                Signup
              </Button>
            </Box>
            <br />
<<<<<<< HEAD
            
=======
>>>>>>> upstream/v2
            {showLogin ? <Login /> : null}
            {showSignup ? <Signup /> : null}
            {/* {loginSignUp === "login" ? <Login /> : <Signup />} */}
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <Container
            className={classes.vertiHoriCenter}
            style={{ height: "84vh" }}
          >
            <img width="100%" src={img1} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Intro;
