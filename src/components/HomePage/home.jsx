import React, {useContext} from "react";
import Navbar from '../Navbar';
import Intro from './Intro';
import styled from 'styled-components';


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