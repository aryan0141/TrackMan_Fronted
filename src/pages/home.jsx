import React, {useContext} from "react";
import Navbar from './../components/Navbar';
import Intro from './../components/intro';
import styled from 'styled-components';
import { userContext } from "../userContext";


const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`


const Home = () => {
  // const {user , setUser} = useContext(userContext);
  
  return (
    <Container>
      <Navbar/>
      {/* <div>{msg}</div> */}
      <Intro/>
    </Container>
  );
};

export default Home;