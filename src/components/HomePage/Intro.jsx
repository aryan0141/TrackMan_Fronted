import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import img1 from './../img/img6.png';
import { userContext } from './../userContext';


const Container = styled.div`
    display: flex;
    width: 100%;
        /* @media only screen and (max-width:480px){
        flex-direction: column;
        padding: 30px 20px;
    } */
`

const Left = styled.div`
    width: 0%;
    /* padding-top: 10%; */
        /* @media only screen and (max-width:480px){
        display: none;
    } */
`

const Center = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0% ;
    /* justify-content: center;
        @media only screen and (max-width:480px){
        width: 100%;
    } */
`

const CardTeacherButton = styled.button`
  height: 160px;
  width: 260px;
  background-color: white;
  position: absolute;
  top: 200px;
  left: 100px;
  border-radius: 8%;
  border: 2px solid #06062c;
  cursor: pointer
`;

const CardStudentButton = styled.button`
  height: 160px;
  width: 260px;
  background-color: white;
  position: absolute;
  top: 420px;
  left: 100px;
  border-radius: 8%;
  border: 2px solid #06062c;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    z-index: -1;
    //height: 100%;
`

const LoginText = styled.div`
    height: 600px;
    width: 450px;
    background-color: transparent;
    color: black;
    position: absolute;
    top: 240px;
    left: 100px;
    border-radius: 8%;
    font-size: 80px;
    /* border: 2px solid #06062c; */
`

const Intro = () => {
    const history = useHistory();

    const { user, setUser} = useContext(userContext);
    const redirectFunction = () => {
        history.push("/teachersPage");
        /* window.location.href="/teachersPage"; */
    }
    return(
        <Container>
            { user && <CardTeacherButton onClick={redirectFunction}> For Teachers</CardTeacherButton> }
            { user && <CardStudentButton></CardStudentButton>}
            { !user && <LoginText>Log in to Get Started </LoginText>}
            <Center><Image src={img1}/></Center>
        </Container>

    )
}

export default Intro