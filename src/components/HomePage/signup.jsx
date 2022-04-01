import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Container, Grid } from "@mui/material";
import { useAlert } from "react-alert";

const Signup = () => {
  const alert = useAlert();
  const [values, setValues] = React.useState({
    firstname: "",
    firstnameError: false,

    lastname: "",
    lastnameError: false,

    email: "",
    emailError: false,

    password: "",
    passwordError: false,

    confirmPassword: "",
    cpasswordError: false,

    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log(values.firstname);
    if (values.firstname == "") {
      setValues({ ...values, firstnameError: true });
      return;
    } else {
      setValues({ ...values, firstnameError: false });
    }

    if (values.lastname == "") {
      setValues({ ...values, lastnameError: true });
      return;
    } else {
      setValues({ ...values, lastnameError: false });
    }

    if (values.email.includes("iitj.ac.in") === false) {
      setValues({ ...values, emailError: true });
      alert.error("Only IITJ Emails are allowed");
      return;
    } else {
      setValues({ ...values, emailError: false });
    }

    if (values.password == "") {
      setValues({ ...values, passwordError: true });
      return;
    } else {
      setValues({ ...values, passwordError: false });
    }

    if (values.confirmPassword == "") {
      setValues({ ...values, cpasswordError: true });
      return;
    } else {
      setValues({ ...values, cpasswordError: false });
    }

    if (values.password != values.confirmPassword) {
      setValues({ ...values, passwordError: true });
      setValues({ ...values, cpasswordError: true });
      alert.error("Both passwords do not match");
      return;
    }
    console.log("Submitted Succesfully");
  };
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              style={{ width: "100%" }}
              label="First Name"
              variant="filled"
              value={values.firstname}
              onChange={handleChange("firstname")}
              error={values.firstnameError}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              style={{ width: "100%" }}
              label="Last Name"
              variant="filled"
              value={values.lastname}
              onChange={handleChange("lastname")}
              error={values.lastnameError}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <TextField
            style={{ width: "100%" }}
            label="Email"
            variant="filled"
            value={values.email}
            error={values.emailError}
            onChange={handleChange("email")}
            helperText="Only IITJ Emails are allowed"
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl sx={{ mt: 1 }} variant="filled">
              <InputLabel htmlFor="password">Password</InputLabel>
              <FilledInput
                id="password"
                variant="outlined"
                style={{ width: "100%" }}
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl sx={{ mt: 1 }} variant="filled">
              <InputLabel htmlFor="confirmpassword">
                Confirm Password
              </InputLabel>
              <FilledInput
                id="confirmpassword"
                style={{ width: "100%" }}
                type={values.showPassword ? "text" : "password"}
                value={values.confirmpassword}
                onChange={handleChange("confirmpassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button
          sx={{ mt: 1 }}
          variant={"contained"}
          color={"primary"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
