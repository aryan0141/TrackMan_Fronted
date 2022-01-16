import React, {useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import { userContext } from './../userContext';

const Container = styled.div`
    height: 60px;
    background-color: #06062c;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    color: white;
    padding-right: 10%;
    padding-top: 2%
`
const LoginContainer = styled.div`
    height: 60px;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
`


const NavBar = () => {

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





    const { user, setUser} = useContext(userContext);
    return(
        <Container>
            <div></div>
            { !user && <LoginContainer>
            <div>
                    <GoogleLogin
                    clientId="821931130263-d6pvkrhi1tjmcrmk2tdcbhp9mpgq3sqn.apps.googleusercontent.com"
                    buttonText="LOG IN      "
                    onSuccess={responseGoogle}
                    onFailure={responseError}
                    cookiePolicy={"single_host_origin"}
                    responseType="code"
                    accessType="offline"
                    scope="openid email profile https://www.googleapis.com/auth/classroom.courses"
                    //prompt='consent'
                    //approval_prompt='force'
                    />
            </div>
            </LoginContainer>}
            
            <div>
            { user && <p>Hi {user.firstName}</p> }
            </div>
            {/* <div>{user.name}</div> */}
        </Container>

    )
}

export default NavBar