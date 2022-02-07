import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, Container, Input, Typography } from "@mui/material";
import "./style.css";
import { Box } from "@mui/system";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LinearProgress from "@mui/material/LinearProgress";
// import {ProgressBar} from 'react-bootstrap';

const FileUploader = ({}) => {
  const [file, setFile] = useState(null);
  const [uploadBtnDisabled,setUploadBtnDisabled] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {

    if(file == null) {
      alert("Select a file first");
      return;
    }

    const fileName1 = file.name;
    var arr = fileName1.split('.');
    var extension = arr[arr.length-1];
    //console.log(extension);
    if(extension !=='csv' && extension!=='sbv')
    {
      alert("Select a Valid .csv or .sbv type File");
      return;
    }
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

    axios.post("http://localhost:3000/api/uploadDoc/upload", data, options).then((res) => {
      console.log(res);

      //console.log(res.data.originalname);
      
      const fileName = String(res.data.originalname);
      console.log(fileName);
      // var fileName = req.files.upload.name;

      axios.post(`http://localhost:3000/api/uploadDoc/addClass` , {fileName}).then((e) =>{
          console.log("Ok printed");
      }).catch((e)=>{
          console.log("error" , e)
      })
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
            <Typography color="textSecondary" style={{fontSize: "0.9rem", marginBottom: "5px"}}><b>Selected:</b> {file.name}</Typography>
          )}
          <Button disabled={uploadBtnDisabled} variant="contained" style={{marginLeft: "50%", transform: "translateX(-50%)", marginTop: "5px"}} onClick={onSubmit}>
            Upload
          </Button>
          <br />
          { uploadPercentage!==0 && <Typography>{uploadPercentage}%</Typography>}
          { uploadPercentage!==0 && <LinearProgress variant="determinate" value={uploadPercentage} />}
        </form>
      </Box>
    </Container>
  );
};

export default FileUploader;
