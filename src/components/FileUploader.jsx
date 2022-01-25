import React, { useState ,useContext} from "react";
import styled from 'styled-components';
import axios from 'axios';
import './style.css';


const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
`
const FileUploader = ({}) =>{

    const [file,setFile] = useState(null);
    const onInputChange = (e) =>{
        setFile(e.target.files[0]);
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        const data = new FormData();
        data.append( "file", file);
        axios.post('api/uploadDoc/upload' , data).then((e)=>{
            //console.log(e.data.originalname);
            
            const fileName = String(e.data.originalname);
            console.log(fileName);
            axios.post(`api/uploadDoc/addClass` , {fileName}).then((e) =>{
                console.log("Ok printed");
            }).catch((e)=>{
                console.log("error" , e)
            })
            console.log("Success");
        }).catch((e)=>{
            console.log(e);
        })
    }
     return(
         <form method="post" action="#" id="#" onSubmit={onSubmit}>
             <div className="form-group files">
                 <label>Upload Your files</label>
                 <input type="file"
                 onChange={onInputChange}
                 className="form-control"
                  multiple=""/>
             </div>
             <button>Upload</button>
         </form>
     )
}

export default FileUploader;