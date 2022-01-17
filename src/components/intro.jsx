import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import img1 from './../img/homepageImg.jpg';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import { userContext } from './../userContext';
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";


const useStyles = makeStyles({
    vertiHoriCenter: {
        display: "flex",
        // height: "90vh",
        // backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
      color: "pink",
      backgroundColor: "blue",
      margin: "auto",
      "&:hover": {
        backgroundColor: "purple",
      },
    },
    title: {
      color: "blue",
      textDecoration: "underline",
    },
    field: {
      marginBottom: 21,
      marginLeft: 21,
    },
  });


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
    const classes = useStyles();
    const history = useHistory();

    const { user, setUser} = useContext(userContext);
    const redirectFunction = () => {
        history.push("/teachersPage");
        /* window.location.href="/teachersPage"; */
    }


    const responseGoogle = response =>{
            // console.log(response);
            const {code} = response;
            axios.post('/api/users/create-tokens', {code}).then(response=>{
                console.log(response.data);
                //console.log(response.data.refresh_token);
                setUser(response.data);
    
            })
            .catch(error => console.log(error.message)
            )
        }
    
        const responseError = error => {
            console.log(error);
        };

    if(user) {
        return (
            <React.Fragment>
                <Container className={classes.vertiHoriCenter} style={{height: "90vh"}}>
                    <Button variant="contained" color="primary" style={{margin: "0px 10px"}} onClick={redirectFunction}>For Teachers</Button>
                    <Button variant="contained" color="primary" style={{margin: "0px 10px"}}>For Students</Button>
                </Container>
            </React.Fragment>
        )
    }
    return(
        <Container>
            <Grid container>
                <Grid item lg={6} className={classes.vertiHoriCenter} style={{height: "90vh"}}>
                    <Box>
                        <Typography style={{color: "black", fontSize: "3.5rem", lineHeight: "3.5rem", marginLeft: "-10px"}} >Trackman</Typography>
                        <Typography 
                            style={{fontSize: "1.2rem"}}
                            color="textSecondary"
                        >
                        A complate application to get a track of your students.
                        </Typography>
                        <br />
                        <GoogleLogin
                            clientId="821931130263-d6pvkrhi1tjmcrmk2tdcbhp9mpgq3sqn.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseError}
                            cookiePolicy={"single_host_origin"}
                            responseType="code"
                            accessType="offline"
                            scope="openid email profile https://www.googleapis.com/auth/classroom.courses"
                            //prompt='consent'
                            //approval_prompt='force'
                        /> 
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Container className={classes.vertiHoriCenter} style={{height: "90vh"}}>
                        <img width="100%" src={img1} alt="" />
                    </Container>
                </Grid>
            </Grid>
        </Container>

    )
}

export default Intro



// import React, {useContext} from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import {GoogleLogin} from 'react-google-login';
// import { userContext } from '../userContext';

// const Container = styled.div`
//     height: 60px;
//     background-color: #06062c;
//     display: flex;
//     align-items: space-between;
//     justify-content: space-between;
//     color: white;
//     padding-right: 10%;
//     padding-top: 2%
// `
// const LoginContainer = styled.div`
//     height: 60px;
//     display: flex;
//     align-items: space-between;
//     justify-content: space-between;
// `



// const Navbar = () => {

//     const responseGoogle = response =>{
//         // console.log(response);
//         const {code} = response;
//         axios.post('/api/users/create-tokens', {code}).then(response=>{
//             console.log(response.data);
//             //console.log(response.data.refresh_token);
//             setUser(response.data);

//         })
//         .catch(error => console.log(error.message)
//         )
//     }

//     const responseError = error => {
//         console.log(error);
//     };





//     const { user, setUser} = useContext(userContext);
//     return(
//         <Container>
//             <div></div>
//             { !user && <LoginContainer>
//             <div>
//                     <GoogleLogin
//                     clientId="821931130263-d6pvkrhi1tjmcrmk2tdcbhp9mpgq3sqn.apps.googleusercontent.com"
//                     buttonText="LOG IN      "
//                     onSuccess={responseGoogle}
//                     onFailure={responseError}
//                     cookiePolicy={"single_host_origin"}
//                     responseType="code"
//                     accessType="offline"
//                     scope="openid email profile https://www.googleapis.com/auth/classroom.courses"
//                     //prompt='consent'
//                     //approval_prompt='force'
//                     />
//             </div>
//             </LoginContainer>}
            
//             <div>
//             { user && <p>Hi {user.firstName}</p> }
//             </div>
//             {/* <div>{user.name}</div> */}
//         </Container>

//     )
// }

// export default Navbar