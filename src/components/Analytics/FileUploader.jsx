import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Button, Container, Input, Typography } from "@mui/material";
import "./style.css";
import { Box } from "@mui/system";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LinearProgress from "@mui/material/LinearProgress";
import { BACKEND_HOST_URL } from "../../config/default";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";

const FileUploader = ({ courseName, resp }) => {
  //console.log(resp);
  const alert = useAlert();
  const userInfo = Cookies.get("userInfo");
  const token = JSON.parse(userInfo).token;
  const config = { headers: { Authorization: token } };

  const [file, setFile] = useState(null);
  const [sortedFiles, setSortedFiles] = useState([]);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const maxFiles = 20;

  const onInputChange = (e) => {
    setFile(e.target.files);
  };
  const history = useHistory();
  const onSubmit = (e) => {
    if (file == null) {
      alert.error("Select a file first");
      return;
    }

    if (file.length > maxFiles) {
      alert.error(`Only ${maxFiles} files can be uploaded at a time`);
      return;
    }

    // To check if a file is already uploaded or not.
    var sameFileUploaded = false;
    file &&
      [...file].map((data) => {
        var found = false;
        if (resp.uploadNames) {
          resp.uploadNames.forEach((file) => {
            if (file.filename == data.name) {
              found = true;
            }
          });
          sameFileUploaded = found;
        }
      });
    if (sameFileUploaded) {
      alert.error(`Some files are already uploaded`);
      return;
    }
    var sortedArray = [];
    for (let x = 0; x < file.length; x++) {
      const fileName1 = file[x].name;
      var arr = fileName1.split(".");
      var extension = arr[arr.length - 1];

      var fileName2 = "";

      if (extension === "csv" || extension === "sbv") {
        if (extension === "csv") {
          const st1 = file[x].name.split(" - Attendance Report.csv");
          const st2 = st1[0];
          fileName2 = st2.substring(17, st2.length);
        } else if (extension === "sbv") {
          const name2 = file[x].name.split(".sbv")[0];
          const name3 = name2.replace("(20", "@20");
          console.log(name3);
          fileName2 = name3.split(" @")[0].trim();
        }

        if (resp.name === fileName2) {
          sortedArray.push(file[x]);
        } else {
          alert.error("Not a valid File Name");
        }
      } else {
        alert.error(`${file[x].name} is not a csv or a sbv file`);
      }
    }

    setSortedFiles(sortedArray);

    const bodyFormData = new FormData();
    console.log(sortedFiles);
    sortedArray.forEach((file) => {
      bodyFormData.append("files", file);
    });
    // console.log(bodyFormData);
    //data.append("file", sortedFiles);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };
    axios
      .post(
        `${BACKEND_HOST_URL}/api/uploadFiles/upload`,
        bodyFormData,
        // options,
        config
      )
      .then(async (res) => {
        setUploadPercentage(100);
        setTimeout(async () => {
          await axios.get(
            `${BACKEND_HOST_URL}/api/StudentsData/updateData/${resp.name}/${resp.teacher}`,
            config
          );
          setUploadPercentage(0);
          setUploadBtnDisabled(false);
          setFile(null);
        }, 1000);
        setTimeout(() => {
          history.go(0);
        }, 2000);
      });
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
        border: "1px solid #a9a9a9",
        borderRadius: "3px",
      }}
    >
      {sortedFiles.length ? console.log(sortedFiles) : null}
      <Box>
        <form method="post" action="#" id="#">
          <div className="files">
            <input
              variant="contained"
              type="file"
              name="files"
              multiple
              className="form-control profile-pic-uploader"
              onChange={onInputChange}
              // onChange={uploadFile}
            />
            <FileUploadIcon
              style={{
                fontSize: "2.9rem",
                color: "grey",
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <Typography align="center">
              Drag and Drop Your file or Click here
              <br/>
              <Typography
                variant="text"
                color="textSecondary"
                style={{ fontSize: "0.8rem" }}
              >
                (Max. {maxFiles} Files can be uploaded at a time)
              </Typography>
            </Typography>
          </div>
          {file &&
            [...file].map((data, index) => (
              <Typography
                key={index}
                color="textSecondary"
                style={{ fontSize: "0.9rem", marginBottom: "5px" }}
              >
                <b>Selected:</b> {data.name}
              </Typography>
            ))}
          <Button
            disabled={uploadBtnDisabled}
            variant="contained"
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              marginTop: "5px",
            }}
            onClick={onSubmit}
          >
            Upload
          </Button>
          <br />
          {uploadPercentage !== 0 && (
            <Typography>{uploadPercentage}%</Typography>
          )}
          {uploadPercentage !== 0 && (
            <LinearProgress variant="determinate" value={uploadPercentage} />
          )}
        </form>
        {/* <form method="post" action="#" id="#">
          <div className="files">
            <input
              variant="contained"
              type="file"
              name="files"
              multiple
              className="form-control profile-pic-uploader"
              onChange={onInputChange}
              // onChange={uploadFile}
            />
            <FileUploadIcon
              style={{
                fontSize: "2.9rem",
                color: "grey",
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <Typography align="center">
              Drag and Drop Your file or Click here
            </Typography>
          </div>
          {file && (
            <Typography
              color="textSecondary"
              style={{ fontSize: "0.9rem", marginBottom: "5px" }}
            >
              <b>Selected:</b> {file.name}
            </Typography>
          )}
          <Button
            disabled={uploadBtnDisabled}
            variant="contained"
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              marginTop: "5px",
            }}
            onClick={onSubmit}
          >
            Upload
          </Button>
          <br />
          {uploadPercentage !== 0 && (
            <Typography>{uploadPercentage}%</Typography>
          )}
          {uploadPercentage !== 0 && (
            <LinearProgress variant="determinate" value={uploadPercentage} />
          )}
        </form> */}
      </Box>
    </Container>
  );
};

export default FileUploader;
