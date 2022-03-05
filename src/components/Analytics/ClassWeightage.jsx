import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TailSpin } from "react-loader-spinner";

export const ClassWeightage = ({ classData, loader }) => {
  const [time, setTime] = React.useState(classData.cutOffMins);
  const [timeError, setTimeError] = React.useState(false);

  const [attendance, setAttendance] = React.useState(classData.cutOffMins);
  const [attendanceError, setAttendanceError] = React.useState(false);

  const [comments, setComments] = React.useState(classData.cutOffMins);
  const [commentsError, setCommentsError] = React.useState(false);

  // React.useEffect(() => {
  //   setTime(classData.cutOffMins);
  //   setAttendance(classData.cutOffMins);
  //   setComments(classData.cutOffMins);
  // }, [loader]);

  const handleUpdate = async () => {
    if (time == "") {
      setTimeError(true);
      return;
    }
    if (attendance == "") {
      setAttendanceError(true);
      return;
    }
    if (comments == "") {
      setCommentsError(true);
      return;
    }

    if (parseInt(time) + parseInt(attendance) + parseInt(comments) != 100) {
      setTimeError(true);
      setAttendanceError(true);
      setCommentsError(true);
      alert("Sum of all three must be equal to 100");
      return;
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          // display: "flex",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6">Weightage</Typography>
        <Typography
          style={{ fontSize: "0.85rem" }}
          variant="text"
          color="textSecondary"
        >
          &#42; You can select how much priority you want to give to Time
          Attended, Attendance or Comments out of 100.
        </Typography>
      </Box>
      {/* <br /> */}
      <Grid container style={{ fontSize: "0.85rem" }} spacing={2}>
        <Grid
          item
          sx={{
            // display: "flex",
            margin: "10px 0px",
          }}
        >
          {!loader ? (
            <TextField
              id="outlined-basic"
              label="Time Weightage"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              error={timeError}
              variant="outlined"
              size="small"
            />
          ) : (
            <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
          )}
        </Grid>
        <Grid
          item
          sx={{
            // display: "flex",
            margin: "10px 0px",
          }}
        >
          {!loader ? (
            <TextField
              id="outlined-basic"
              label="Attendance Weightage"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              error={attendanceError}
              variant="outlined"
              size="small"
            />
          ) : (
            <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
          )}
        </Grid>
        <Grid
          item
          sx={{
            // display: "flex",
            margin: "10px 0px",
          }}
        >
          {!loader ? (
            <TextField
              id="outlined-basic"
              label="Comments Weightage"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              error={commentsError}
              variant="outlined"
              size="small"
            />
          ) : (
            <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
          )}
        </Grid>
      </Grid>
      <Button
        size="large"
        sx={{
          margin: "auto",
          padding: "4px 15px",
        }}
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Update
      </Button>
    </React.Fragment>
  );
};
