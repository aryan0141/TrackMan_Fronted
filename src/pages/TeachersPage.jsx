import React, { useState , useEffect,useContext} from "react";
import styled from 'styled-components';
import axios from 'axios';
import { userContext } from './../userContext';
import Card from './../components/card';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  /* overflow: hidden;
  position: relative; */
`

const load = async (email) => {
  const resp = await axios.get(`/api/users/courseList/${email}`);
  //console.log(resp.data);
  return(resp.data);
}



const TeachersPage = () => {
  
  const { user, setUser} = useContext(userContext);
  // console.log(user);

  const [resp , setResp] = useState([]);

  useEffect( () => {
    //const response = axios.get(`/api/users/courseList/${user.email}`);
    setResp(load(user.email));
    //setResp(response.data);
    // load(user.email);
    // return () => {
      
    // }
  }, [])

  console.log(resp , "ayush");
  
 
  // var resp = load(user.email);
  // if(resp)
  // {
  //   console.log(resp);
  // }

  return (
      
    <Container>
        {resp && resp.courses && resp.courses.map((item) => (<Card item={item} key={item.id} />)) }
        {/* <h>{user.name}</h> */}
    </Container>
  );
};

export default TeachersPage;