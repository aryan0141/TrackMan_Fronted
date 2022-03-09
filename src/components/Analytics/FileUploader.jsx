import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Button, Container, Input, Typography } from "@mui/material";
import "./style.css";
import { Box } from "@mui/system";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LinearProgress from "@mui/material/LinearProgress";
// import {ProgressBar} from 'react-bootstrap';

const FileUploader = ({ courseId, resp: { fileNames } })  => {
  // console.log(fileNames);
  const [file, setFile] = useState(null);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const history = useHistory();

  const onSubmit = async (e) => {
    if (file == null) {
      alert("Select a file first");
      return;
    }

    const fileName1 = file.name;
    var arr = fileName1.split(".");
    var extension = arr[arr.length - 1];
    //console.log(extension);
    if (extension !== "csv" && extension !== "sbv") {
      alert("Select a Valid .csv or .sbv type File");
      return;
    }

    // if (extension === "csv") {
    //   // const filename2 = arr[0];
    //   const st1 = fileName1.split(" - Attendance Report.csv");
    //   const st2 = st1[0];
    //   const st3 = st2.substring(17, st2.length);
    //   console.log(st3);
    //   if (!fileNames.includes(st3)) {
    //     alert("Filename not allowed for this class");
    //     return;
    //   }
    //   // else{

    //   // }
    // }
    //console.log(file);
    setUploadBtnDisabled(true);
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

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

    // const res11 = await axios.post("/api/uploadDoc/upload", data, options);
    // if(res11.data.status===200){
    //   setUploadPercentage(100);
    //   setTimeout(() => {
    //     setUploadPercentage(0);
    //     setUploadBtnDisabled(false);
    //     setFile(null);
    //   }, 1000);
    //   const fileName = String(res11.data.originalname);
    //   const res12 = await axios.post(`/api/uploadDoc/addClass`, { fileName });
    //   if(res12.data.status===200){
    //     console.log("OK ADDED");
    //     history.go(0);
    //   }
    // }

    axios.post("/api/uploadDoc/upload", data, options).then((res) => {
      console.log(res, "INSIDE");

      //console.log(res.data.originalname);

      const fileName = String(res.data.originalname);
      console.log(fileName);
      // var fileName = req.files.upload.name;

      axios.post(`/api/uploadDoc/addClass` , {fileName}).then((res1) =>{
          console.log("Ok printed");
          console.log(res1);
          history.go(0);
          // history.push(`/analytics/${courseId}`);

      }).catch((e)=>{
          console.log("error" , e)
      })

      // const res12 = await axios.post(`/api/uploadDoc/addClass`, { fileName });
      // if (res12.data.status === 400) {
      //   alert(res.data.msg);
      // }
      // if (res12.data.status === 200) {
      //   history.go(0);
      // }
      console.log("Success");

      setUploadPercentage(100);
      setTimeout(() => {
        setUploadPercentage(0);
        setUploadBtnDisabled(false);
        setFile(null);
      }, 1000);
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
      <Box>
        <form method="post" action="#" id="#">
          <div className="files">
            <input
              variant="contained"
              type="file"
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
        </form>
      </Box>
    </Container>
  );
};

export default FileUploader;
