import React, { useState , useEffect,useContext} from "react";
import styled from 'styled-components';
import axios from 'axios';
import { userContext } from '../../userContext';
import ClassroomCard from './card';
import Navbar from '../Navbar';
import { Container, Grid } from "@mui/material";

// const load = async (email) => {
//   const resp = await axios.get(`/api/users/courseList/${email}`);
//   //console.log(resp.data);
//   return(resp.data);
// }



const TeachersPage = () => {
  const [isLoading , setIsLoading] = useState(true);

  const { user, setUser} = useContext(userContext);

  const [resp , setResp] = useState([]);

  useEffect(()=>{
    const getItems = async () => {
      try{
        setIsLoading(true);
        const response = await axios.get(`/api/users/courseList/${user.email}`);
        setResp(response.data);
        setIsLoading(false);
      }catch(e)
      {
        console.log("error occured  " , e)
      }
    }
    
    getItems();
  },[])

  console.log(resp);
  
  return (
    <React.Fragment>
      <Navbar />
      <Container style={{marginTop: "50px"}}>
        <Grid container spacing={2}>
          {!isLoading ? (resp.courses.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={6} lg={4}>
              <ClassroomCard item={item} />
            </Grid>
          ))) : <p>Loading</p>}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default TeachersPage;