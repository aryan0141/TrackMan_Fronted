import * as React from "react";
import axios from "axios";
import { useContext } from "react";
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { userContext } from "../../userContext";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
  blue,
} from "@mui/material/colors";
// import { BACKEND_HOST_URL } from "../../config/default";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { BACKEND_HOST_URL } from "../../config/default";


const userInfo = Cookies.get("userInfo");
const token = JSON.parse(userInfo).token;
const config = { headers: { Authorization: token } };

const ClassroomCard = (props) => {
  const item = props.item;
  const { user, setUser } = useContext(userContext);
  const history = useHistory();
  const classroomPage = () => {
    history.push(`/analytics/${item.name}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {item.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => props.onChange(item.name)}>
            <DeleteIcon style={{fontSize: "1.9rem"}} />
          </IconButton>
        }
        titleTypographyProps={{ variant: "h5" }}
        title={item.name[0].toUpperCase() + item.name.slice(1)}
      />
      <ul>
        <li>
          <Typography color="textSecondary" variant="text">
            Total Classes: {item.totalClasses}
          </Typography>
        </li>
        <li>
          <Typography color="textSecondary" variant="text">
            Total Time:{" "}
            {item.totalDuration > 180
              ? `${parseInt(item.totalDuration / 60)}hrs ${parseInt(
                  item.totalDuration % 60
                )}mins`
              : `${parseInt(item.totalDuration)}mins`}
          </Typography>
        </li>
        <li>
          <Typography color="textSecondary" variant="text">
            Students Enrolled:{" "}
            {item.StudentsData ? item.StudentsData.length : 0}
          </Typography>
        </li>
      </ul>
      <Container style={{ margin: "15px 0px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => classroomPage(item.id)}
        >
          Enter
        </Button>
      </Container>
    </Card>
  );
};

export default ClassroomCard;
