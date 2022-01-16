// import logo from './logo.svg';
// import {GoogleLogin} from 'react-google-login';
// import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch,Route, Redirect , useHistory} from "react-router-dom"
import React, {useState} from 'react';
import Home from './pages/home.jsx';
import TeachersPage from './pages/TeachersPage';
import { userContext } from './userContext';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  return (
    <Router>
      <Switch>
        <userContext.Provider value={{user , setUser}}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/teachersPage">
            <TeachersPage/>
          </Route>
        </userContext.Provider>
        {/* <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;



  // const responseGoogle = response =>{
  //   console.log(response);
  //   // const {code} = response;
  //   // axios.post('/api/create-tokens', {code}).then(response=>{
  //   //   console.log(response.data);
  //   // }).catch(error => console.log(error.message)
  //   // )
  // }

  // const responseError = error => {
  //     console.log(error);
  // };




//{
  /* <div>
      <div className="App">
        <h1>Google Calendar API</h1>
      </div>
      <div>
        <GoogleLogin
          clientId="821931130263-d6pvkrhi1tjmcrmk2tdcbhp9mpgq3sqn.apps.googleusercontent.com"
          buttonText="SIGN IN AND AUTHORIZE"
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
</div> */
//}










      // {
        /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      // }