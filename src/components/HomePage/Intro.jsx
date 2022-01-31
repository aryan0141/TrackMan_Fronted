import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import img1 from './../../img/homepageImg.jpg';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import { userContext } from './../../userContext';
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";
import Cookies from 'js-cookie';


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
                Cookies.set('userInfo', response.data.access_token , {expires: 0.04 , path:'/'});
                //console.log(response.data.refresh_token);
                setUser(response.data);
                //localStorage.setItem( 'userDetails' , JSON.stringify(response.data));
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
                            prompt= "select_account"
                            scope="openid email profile https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails"
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