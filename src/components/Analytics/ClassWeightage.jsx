import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { useAlert } from 'react-alert'
import { BACKEND_HOST_URL } from "../../config/default";

export const ClassWeightage = ({ classData, loader }) => {
  const [time, setTime] = React.useState(classData.weightAge[0]);
  const [timeError, setTimeError] = React.useState(false);

  const [attendance, setAttendance] = React.useState(classData.weightAge[1]);
  const [attendanceError, setAttendanceError] = React.useState(false);

  const [comments, setComments] = React.useState(classData.weightAge[2]);
  const [commentsError, setCommentsError] = React.useState(false);

  const alert = useAlert()

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
      alert.error('Total sum must be equal to 100')
      return;
    }

    const weightAgeDoc = {
      w1: time,
      w2: attendance,
      w3: comments,
      className2: classData.name,
    };

    
    const resp = await axios.post(`${BACKEND_HOST_URL}/api/fileNames/updateWeightageArr`, {
      weightAgeDoc,
    });
    if (resp.data.status === 200) {
      setTime(time);
      setAttendance(attendance);
      setComments(comments);
      setTimeError(false);
      setAttendanceError(false);
      setCommentsError(false);
      alert.success('Updated Succesfully')
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
