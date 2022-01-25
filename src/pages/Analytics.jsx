import React, {useContext} from "react";
import { userContext } from './../userContext';
import FileUploader from './../components/FileUploader';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
`
// const fileUploader = ({}) =>{
//      return(
//          <form method="post" action="#" id="#">
//              <div className="form-group files">
//                  <label>Upload Your files</label>
//                  <input type="file" className="form-control" multiple=""/>
//              </div>
//              <button></button>
//          </form>
//      )
// }

const Analytics = () => {
  const {user , setUser} = useContext(userContext);
  
  return (
    // <React.Fragment>
    // { user ?
    //   (
      <Container>
        <FileUploader/>
      </Container>
    //   )
    //   : <p>Load </p>
    // }
    // </React.Fragment>
  );
};

export default Analytics;