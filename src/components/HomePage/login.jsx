import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";

import axios from "axios";
import { BACKEND_HOST_URL } from "../../config/default";
import { useContext } from "react";
import { userContext } from "../../userContext";

const Login = () => {
  const { user, setUser } = useContext(userContext);

  const alert = useAlert();
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (!email.includes("iitj.ac.in")) {
      setEmailError(true);
      alert.error("Only IITJ Emails are allowed");
      return;
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    console.log("Submitted Succesfully");
    // Login Process
    try {
      const data = {
        email,
        password,
      };
      const res = await axios.post(`${BACKEND_HOST_URL}/auth/v2/login`, data);
      Cookies.set("userInfo", JSON.stringify(res.data), {
        expires: 1,
        path: "/",
      });
      setUser(res.data);
    } catch (err) {
      alert.error(err.response.data.err);
    }
  };
  return (
    <React.Fragment>
      {/* <Container> */}
        <Box sx={{ mt: 2 }}>
          <TextField
            style={{ width: "100%" }}
            label="Email"
            variant="filled"
            value={email}
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Only IITJ Emails are allowed"
          />
        </Box>
        <Box>
          <FormControl sx={{ mt: 1, width: "100%" }} variant="filled">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              variant="outlined"
              style={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Button
          sx={{ mt: 1 }}
          variant={"contained"}
          color={"primary"}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography>Sample Login:</Typography>
        <Typography>Email: garg.10@iitj.ac.in</Typography>
        <Typography>Password: abcdefgh</Typography>
      {/* </Container> */}
    </React.Fragment>
  );
};

export default Login;
