import React, {useContext} from "react";
import styled from 'styled-components';
import { userContext } from './../userContext';

const Container = styled.div`
  height: 100px;
  width: 100px;
  /* overflow: hidden;
  position: relative; */
`
const CourseName = styled.h1`

`


const Card = ({item}) => {

    console.log(item)
  return (
      
    <Container>
        <CourseName>{item.name}</CourseName>
    </Container>
  );
};

export default Card;