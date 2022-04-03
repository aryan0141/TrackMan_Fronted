// import logo from './logo.svg';
// import {GoogleLogin} from 'react-google-login';
import axios from "axios";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./components/HomePage/home";
import TeachersPage from "./components/TeachersPage/TeachersPage";
import Analytics from "./components/Analytics/Analytics";
import Contact from "./components/Contact.jsx";
import { userContext } from "./userContext";
import { blue, red } from "@mui/material/colors";
// import { createTheme } from "@mui/material";
// import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
// import { amber, blue } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import Cookies from "js-cookie";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import NotFound from "./components/NotFound";
import EmailVerify from "./components/HomePage/emailVerify";

const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

// optional cofiguration
const options = {
  position: "top center",
  // type: "success",
  timeout: 5000,
  offset: "30px",
  transition: "scale",
};

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const readCookie = async () => {
    const userInfo = Cookies.get("userInfo");
    //const resp = await
    if (userInfo) {
      // axios
      //   .get(
      //     `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${userInfo}`
      //   )
      //   .then((resp) => {
      //     const currUser = {
      //       name: resp.data.name,
      //       firstName: resp.data.given_name,
      //       lastName: resp.data.family_name,
      //       email: resp.data.email,
      //       picture: resp.data.picture,
      //       access_token: userInfo,
      //     };
      //     setUser(currUser);
      //   });
      // console.log(JSON.parse(userInfo));
      setUser(JSON.parse(userInfo));
      // console.log(user);
      // console.log(JSON.parse(userInfo).token);
    } else {
      Cookies.remove("userInfo");
      setUser(null);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <userContext.Provider value={{ user, setUser }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/contacts">
                  <Contact />
                </Route>
                {/* {user && user.email ? ( */}
                <Route path="/teachersPage">
                  <TeachersPage />
                </Route>
                {/* ) : ( */}
                {/* <Redirect to="/" /> */}
                {/* )} */}
                {/* {user && user.email ? ( */}
                <Route path="/analytics/:courseName">
                  <Analytics />
                </Route>
                <Route path="/auth/activate/:token" component={EmailVerify} />
                {/* ) : ( */}
                {/* <Redirect to="/" /> */}
                {/* )} */}
                <Route component={NotFound} />
              </Switch>
            </userContext.Provider>

            {/* 
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route> */}
          </Switch>
        </Router>
      </ThemeProvider>
    </AlertProvider>
  );
}

export default App;
