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

// const load = async (email) => {
//   const resp = await axios.get(`/api/users/courseList/${email}`);
//   //console.log(resp.data);
//   return(resp.data);
// }

const para = styled.p`

`


const TeachersPage = () => {
  const [isLoading , setIsLoading] = useState(true);

  const { user, setUser} = useContext(userContext);
  // console.log(user);

  const [resp , setResp] = useState([]);

  // useEffect( () => {
  //   //const response = axios.get(`/api/users/courseList/${user.email}`);
  //   setResp(load(user.email));
  //   //setResp(response.data);
  //   // load(user.email);
  //   // return () => {     
  //   // }
  // }, [])


  useEffect(()=>{
    const getItems = async () => {
      try{
        setIsLoading(true);
        const response = await axios.get(`/api/users/courseList/${user.email}`);
        setResp(response.data);
        setIsLoading(false);
        
        // return(response.data);
      }catch(e)
      {
        console.log("error occured  " , e)
        // return(e);
      }
    }
    // let items = 
    getItems();
    // setResp(items);
  },[])

  // useEffect(async () => {
  //    try {
       
  //       setIsLoading(true);
  //      const data = await axios.get(`/api/users/courseList/${user.email}`);
  //      setResp(data);      
  //      setIsLoading(false);
  //    }catch (error) {     
  //      setIsLoading(false);
  //      console.log(error);
  //    }
  // }, []);

  console.log(resp , "ayush");
  
 
  // var resp = load(user.email);
  // if(resp)
  // {
  //   console.log(resp);
  // }

  return (
      
    <Container>
        {!isLoading ? (resp.courses && resp.courses.map((item) => (<Card item={item} key={item.id} />) ) ): <p>Loading</p>  }
        {/* <h>{user.name}</h> */}
    </Container>
  );
};

export default TeachersPage;