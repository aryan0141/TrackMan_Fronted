import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TailSpin } from "react-loader-spinner";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ClassroomNames = ({ data, loading }) => {
  const [nameData, setNameData] = React.useState(null);
  React.useEffect(() => {
    setNameData(data.fileNames);
  }, [loading]);

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [timeError, setTimeError] = React.useState(false);
  const [finalTime , setFinalTime] = React.useState("");

  React.useEffect(() => {
    setFinalTime(data.cutOffMins);
  }, [loading]);

  

  //const [filena , setFilena] = React.useState(false);

  const handleDelete =  (nameToDelete) =>  async() => {
    try{
    if (nameData.length <= 1) {
      alert("You cannot delete the last name");
      return;
    }

    //   Call the deleting route here.
    const filename = {
      name: nameToDelete,
      classname: data.name,
      //"mathematics121"
    } 
    console.log(filename);
    const res = await axios.post(`http://localhost:3000/api/fileNames/deleteFileName` , {filename});
    if(res.data.status === 400){
        alert(res.data.msg);
        // return;
      }else if(res.data.status ===200){
        console.log("Lets delete it");
        setNameData((name) => name.filter((name) => name !== nameToDelete));
        //setNameData([...nameData,name]);
    }
    // .then((e) =>{
    //   setNameData((name) => name.filter((name) => name !== nameToDelete));
    //   console.log("Ok Deleted");
    // }).catch((e)=>{
    //   console.log("error" , e)
    // })

    //setNameData((name) => name.filter((name) => name !== nameToDelete));
    }catch(err){
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
    }

    try{
      console.log(cuttOffMin1);
      const res = await axios.post(`http://localhost:3000/api/fileNames/updateCuttOffMin`, { cuttOffMin1 });
      if(res.data.status === 400){
        alert(res.data.msg);
        // return;
      }else if(res.data.status ===200){
        //console.log("Success 123");
        setFinalTime(time);
        // setNameData([...nameData,name]);
      }
    }catch(e){
      console.log(e);
    }
    setTime("");
    setTimeError(false);
  }

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
    } 
    console.log(filename);
    try{
      //nameData.push(name);
      
      const res = await axios.post(`http://localhost:3000/api/fileNames/addFileName` , {filename});
      console.log(res);
      // if(res){
      //  setNameData([...nameData,name]);
      // }
      if(res.data.status === 400){
        alert(res.data.msg);
        // return;
      }else if(res.data.status ===200){
        setNameData([...nameData,name]);
      }
    }catch(e){
      console.log(e);
    }
    // axios.post(`http://localhost:3000/api/fileNames/addFileName` , {filename}).then((e) =>{
    //   //nameData.push(name);
    //   // setNameData(nameData);
    //   // console.log(e);
    //   console.log("Ok Added");
    // }).catch((e)=>{
    //   console.log("error" , e)
    // })

    // if(filena){
    //   nameData.push(name);
    // setNameData(nameData);
    // }
    // nameData.push(name);
    // setNameData(nameData);
    setName("");
    setNameError(false);
  };

  return (
    <React.Fragment>
      <Box
        style={{
          marginBottom: "20px",
          border: "1px solid #a9a9a9",
          padding: "20px",
          borderRadius: "4px",
        }}
      >
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
                    onDelete={data === "React" ? undefined : handleDelete(data)}
                  />
                </ListItem>
              );
            })
          ) : (
            <TailSpin heigth="35" width="35" color="rgb(33, 150, 243)" />
          )}
        </Paper>
        <Box
        sx={{
          margin: "30px 0px 8px 0px",
        }}>
          
        <Box
          sx={{
            display: "flex",
            margin: "10px 0px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Cutt-Off Time in (mins)"
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
            Submit
          </Button>
            
        </Box>
        {!loading ? (
          <Chip
            color="primary"
            label={`${finalTime} mins`}
          />
        ) : (
          <TailSpin heigth="21" width="21" color="rgb(33, 150, 243)" />
        )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ClassroomNames;
