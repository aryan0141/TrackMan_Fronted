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

const FileUploader = ({ courseId, resp }) => {
  //console.log(resp);
  const [file, setFile] = useState(null);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const history = useHistory();
  const onSubmit = (e) => {
    if (file == null) {
      alert("Select a file first");
      return;
    }

    if(fileNames.includes(file)) {
      alert("You cannot upload the same file again, first delete it than upload it again.");
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
    //console.log(file);
    if (resp.uploadNames){
      for(let x = 0 ; x<resp.uploadNames.length ; x++){
        if(resp.uploadNames[x].filename === fileName1){
                alert("File already uploaded");
                return;
        }
      }

    }
    
      // if(extension==="csv"){
      //   //const filename2 = arr[0];
      //   const st1 = fileName1.split(" - Attendance Report.csv");
      //   const st2 = st1[0];
      //   const st3 = st2.substring(17, st2.length);
      //   console.log(st3);
      //   if(!fileNames.includes(st3)){
      //     alert("FileName not allowed for this class");
      //     return;
      //   }else{

      //   }
      // }
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

<<<<<<< HEAD
    axios.post("/api/uploadDoc/upload", data, options).then((res) => {
=======
    axios.post("/api/uploadDoc/upload", data, options).then(async (res) => {
      console.log(res, "INSIDE");
>>>>>>> upstream/master

      //console.log(res.data.originalname);

      // const fileName = String(res.data.originalname);
      //console.log(fileName);
      // var fileName = req.files.upload.name;

      // axios.post(`http://localhost:3000/api/uploadDoc/addClass` , {fileName}).then((e) =>{
      //     console.log("Ok printed");
      //     history.push(`/analytics/${courseId}`);

      // }).catch((e)=>{
      //     console.log("error" , e)
      // })

      const fileName22 = {
        fileName: String(res.data.originalname),
        courseId22: resp.courseId,
      };

      const res12 = await axios.post(`/api/uploadDoc/addClass`, { fileName22 });
      console.log(res12);

      if (res12.data.status === 200) {
        console.log(res12);
        // history.go(0);
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } else if (res12.data.status === 400) {
        alert("Error with filename or class's name");
        setTimeout(() => {
          history.go(0);
        }, 1000);
      }
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
