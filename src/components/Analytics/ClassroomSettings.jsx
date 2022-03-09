import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TailSpin } from "react-loader-spinner";
import { ClassWeightage } from "./ClassWeightage";
import { blue, green, orange, yellow } from "@mui/material/colors";
import { useAlert } from 'react-alert'

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ClassroomNames = ({ data, loading }) => {
  const alert = useAlert()
  var a1 = ``;
  
  const history = useHistory();

  const [nameData, setNameData] = React.useState(null);
  React.useEffect(() => {
    setNameData(data.fileNames);
    a1 = data.uploadTime + data.FileType;
  }, [loading]);

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [timeError, setTimeError] = React.useState(false);
  const [finalTime, setFinalTime] = React.useState("");

  const [filesData, setFilesData] = React.useState(null);

  React.useEffect(() => {
    setFinalTime(data.cutOffMins);
    setFilesData(data.uploadNames);
  }, [loading]);

  const handleFilesDelete = (fileData) => async () => {
    if (fileData.FileType === "csv") {
      const res = await axios.get(
        `http://localhost:3000/api/uploadDoc/deleteEveryClass/${data.courseId}/${fileData.fileId}`
      );

      if (res.data.status === 200) {
        history.go(0);
        alert.success('Deleted Successfully');
      }
    } else if (fileData.FileType === "sbv") {
      const res = await axios.get(
        `http://localhost:3000/api/uploadDoc/deleteEveryClassSbv/${data.courseId}/${fileData.fileId}`
      );

      if (res.data.status === 200) {
        history.go(0);
        alert.success('Deleted Successfully');
      }
    }
  };

  const handleDelete = (nameToDelete) => async () => {
    try {
      if (nameData.length <= 1) {
        alert.error("You must have atleast one name")
        return;
      }

      //   Call the deleting route here.
      const filename = {
        name: nameToDelete,
        classname: data.name,
        //"mathematics121"
      };
      console.log(filename);
      const res = await axios.post(
        `http://localhost:3000/api/fileNames/deleteFileName`,
        { filename }
      );
      if (res.data.status === 400) {
        alert.error(res.data.msg);
      } else if (res.data.status === 200) {
        setNameData((name) => name.filter((name) => name !== nameToDelete));
        alert.success('Deleted Successfully');
        history.go(0);
        //setNameData([...nameData,name]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCuttOffTimeClick = async () => {
    if (time === "") {
      setTimeError(true);
      return;
    }

    const cuttOffMin1 = {
      cuttOffMin: time,
      className1: data.name,
    };

    try {
      console.log(cuttOffMin1);
      const res = await axios.post(
        `http://localhost:3000/api/fileNames/updateCuttOffMin`,
        { cuttOffMin1 }
      );
      if (res.data.status === 400) {
        alert.error(res.data.msg);
        // return;
      } else if (res.data.status === 200) {
        //console.log("Success 123");
        setFinalTime(time);
        // setNameData([...nameData,name]);
      }
    } catch (e) {
      console.log(e);
    }
    setTime("");
    setTimeError(false);
  };

  const handleClick = async () => {
    if (name === "") {
      setNameError(true);
      return;
    }

    // Call the name adding route here.
    const filename = {
      name: name,
      classname: data.name,
      //"mathematics121"
    };
    console.log(filename);
    try {
      //nameData.push(name);

      const res = await axios.post(
        `http://localhost:3000/api/fileNames/addFileName`,
        { filename }
      );
      console.log(res);
      if (res.data.status === 400) {
        alert.error(res.data.msg);
      } else if (res.data.status === 200) {
        setNameData([...nameData, name]);
        history.go(0);
      }
    } catch (e) {
      console.log(e);
    }
    setName("");
    setNameError(false);
  };

  return (
    <React.Fragment>
      <Box
        style={{
          border: "1px solid #a9a9a9",
          padding: "20px",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography variant="h6">Classroom Names</Typography>
          <Typography
            style={{ fontSize: "0.85rem" }}
            variant="text"
            color="textSecondary"
          >
            &#42; Different names of the files, that you want to upload.
          </Typography>
          <Box
            sx={{
              display: "flex",
              margin: "10px 0px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter Classroom Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              variant="outlined"
              size="small"
            />
            <Button
              size="large"
              sx={{
                margin: "auto 10px",
                padding: "4px 15px",
              }}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Enter
            </Button>
          </Box>
          <Paper
            sx={{
              display: "flex",
              //   justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {!loading && nameData ? (
              nameData.map((data, index) => {
                let icon;

                if (data === "React") {
                  icon = <TagFacesIcon />;
                }

                return (
                  <ListItem key={index}>
                    <Chip
                      color="primary"
                      icon={icon}
                      label={data}
                      onDelete={
                        data === "React" ? undefined : handleDelete(data)
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
            )}
          </Paper>
        </Box>

        <hr style={{ width: "15%", textAlign: "left", marginLeft: "0px", height:"3px", borderRadius: "6px", border: "none", backgroundColor: blue[500] }} />

        {/* Cutt off time */}
        <Box
          sx={{
            margin: "20px 0px",
          }}
        >
          <Typography variant="h6">Cut-off time</Typography>
          <Typography
            style={{ fontSize: "0.85rem" }}
            variant="text"
            color="textSecondary"
          >
            &#42; Minimum time a student must be present in the lecture to mark
            his/her attendance.
          </Typography>
          <Box
            sx={{
              display: "flex",
              margin: "10px 0px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter in (mins)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              error={timeError}
              variant="outlined"
              size="small"
            />
            <Button
              size="large"
              sx={{
                margin: "auto 10px",
                padding: "4px 15px",
              }}
              variant="contained"
              color="primary"
              onClick={handleCuttOffTimeClick}
            >
              Update
            </Button>
          </Box>
          {!loading ? (
            <Chip color="primary" label={`${finalTime} mins`} />
          ) : (
            <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
          )}
        </Box>

        <hr style={{ width: "15%", textAlign: "left", marginLeft: "0px", height:"3px", borderRadius: "6px", border: "none", backgroundColor: blue[500] }} />

        {/* Class Parameters Weightage */}
        <Box
          sx={{
            margin: "20px 0px",
          }}
        >
          {!loading ? (
            <ClassWeightage classData={data} loader={loading} />
          ) : (
            <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
          )}
        </Box>

        <hr style={{ width: "15%", textAlign: "left", marginLeft: "0px", height:"3px", borderRadius: "6px", border: "none", backgroundColor: blue[500] }} />

        {/* Names of uploaded files */}
        <Box
          sx={{
            margin: "20px 0px",
          }}
        >
          <Typography variant="h6">Files Uploaded</Typography>
          <Typography
            style={{ fontSize: "0.85rem" }}
            variant="text"
            color="textSecondary"
          >
            &#42; The files you have uploaded.
          </Typography>
          <Paper
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {!loading ? (
              filesData == undefined || filesData.length == 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No files uploaded yet!
                </Typography>
              ) : (
                filesData.map((data, index) => {
                  const a1 = data.uploadTime + " __" + data.FileType;
                  return (
                    <ListItem key={index}>
                      <Chip
                        color="primary"
                        label={a1}
                        // label={data.fileId}
                        onDelete={handleFilesDelete(data)}
                      />
                    </ListItem>
                  );
                })
              )
            ) : (
              <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
            )}
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ClassroomNames;
