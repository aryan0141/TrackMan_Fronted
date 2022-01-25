import * as React from 'react';
import axios from 'axios';
import  {useContext} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { userContext } from './../userContext';
import styled from 'styled-components';

const Button = styled.button`

`

const ClassroomCard = ({item}) => {
  const { user, setUser} = useContext(userContext);

  const func = () =>{
    axios.get(`/api/users/createCompleteClass/${user.email}/${item.id}/${item.name}/${user.access_token}`);
  }

  console.log("Here");
  console.log(user);
  console.log(item);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={item.name}
        subheader= {`Room: ${item.room} | Section: ${item.section}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum, pariatur tenetur, ab vel cupiditate aliquam odit asperiores excepturi rerum tempora.
        </Typography>
      </CardContent>
      <Button onClick={func}>Click Me</Button>
    </Card>
    
    
  );
};

export default ClassroomCard;








