import * as React from "react";
import axios from "axios";
import { useContext } from "react";
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { userContext } from "../../userContext";
import styled from "styled-components";
import { Box } from "@mui/system";
import { amber, blue, green, orange, purple, teal, yellow } from "@mui/material/colors";
import { BACKEND_HOST_URL } from "../../config/default";

const ClassroomCard = ({ item, color }) => {
  const { user, setUser } = useContext(userContext);

  const func = () => {
    axios.get(
      `${BACKEND_HOST_URL}/api/users/createCompleteClass/${user.email}/${item.id}/${item.name}/${user.access_token}`
    );
  };

  const history = useHistory();
  const classroomPage = () => {
    history.push(`/analytics/${item.name}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ minHeight: 50 }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {item.name[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <DeleteIcon />
        //   </IconButton>
        // }
        title={item.name}
        subheader={`Room: ${item.room} | Section: ${item.section}`}
      />
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum,
          pariatur tenetur, ab vel cupiditate aliquam odit asperiores excepturi
          rerum tempora.
        </Typography>
      </CardContent> */}
      <Box style={{ marginTop: "100px", display: "flex", padding: "10px" }}>
        <Box style={{ flexGrow: "1" }}>
          {/* <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            color="primary"
            onClick={func}
          >
            Click Me
          </Button> */}
          <Button
            // style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => classroomPage(item.id)}
          >
            Enter
          </Button>
        </Box>
        <IconButton aria-label="settings" onClick={() => window.open(item.teacherFolder.alternateLink)}>
          <DriveFolderUploadIcon  />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ClassroomCard;
