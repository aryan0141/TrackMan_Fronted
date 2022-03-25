import React, {useContext} from "react";
import Navbar from '../navbar';
import Intro from './Intro';
import styled from 'styled-components';
import { Footer } from "../Footer";


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
      <Footer />
    </Container>
  );
};

export default Home;