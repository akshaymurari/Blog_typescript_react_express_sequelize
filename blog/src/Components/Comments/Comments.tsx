import React from 'react'
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { Baseurl } from "../../App";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import "./Comments.scss";

const Comments = (props:{data:{id:number,display:string,close:Function}}) => {
    console.log(props.data.id);
    const [value,setvalue] = React.useState("");
    if(props.data.display==="flex"){
        props.data.display="block"
    }
    const [comments,setcomments] = React.useState<any>([]);
    console.log(value);
    const addcomment = async (id:number) => {
      try{
        const result = await axios({
          method: "post",
          url: `${Baseurl}/comment`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          data: { token: localStorage.getItem("token"),message:value,id},
        });
        console.log(result.data);
        comments.push(result.data);
        setcomments([...comments]);
      }catch(error){
        console.log(error);
      }
    }
    React.useEffect(()=>{
        const getcomments = async (id:number) => {
            console.log(id);
            try{
              const result = await axios({
                method: "post",
                url: `${Baseurl}/getcomments`,
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
                data: { token: localStorage.getItem("token"),id},
              });
              console.log(result.data);
              setcomments(result.data);
            }catch(error){
              console.log(error);
            }
          }
        getcomments(props.data.id);
    },[props.data.id]);
    return (
      <>
         <div className="commentbox" style={{position: "fixed",background:"#fff",top: "73%",left: "50%",transform: "translate(-50%, -10%)",
                    display: props.data.display,
                    zIndex: 1000,
        
        }}>
            <TextField className="commentbox1" id="standard-basic" label="comment" value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
              setvalue(e.target.value);
          }
            }/>
            <IconButton onClick={()=>{
              addcomment(props.data.id);
            }}>
              <AddIcon/>
            </IconButton>
          </div>
          <div
          className="shadow bg-white commentbox"
          style={{
            height: "28rem",
            overflowY: "scroll",
            display: props.data.display,
            flexDirection: "column",
            position: "fixed",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: "50%",
            borderRadius: "0.3rem",
            flexWrap: "wrap",
            wordWrap: "break-word",
            zIndex: 999,
            paddingBottom:"3.3rem"
          }}
        >
          <IconButton
            style={{
              // position:"fixed",
              width: "max-content",
              left: "100%",
              transform: "translate(-100%,30%)",
              // bottom:"1rem"
              marginBottom: "0.3rem",
            }}
            onClick={()=>props.data.close()}
          >
            <HighlightOffIcon />
          </IconButton>
          <div
              className=" mb-3 mt-0  mx-auto"
              onClick={() => {
                // getprofile(ele);
              }}
              style={{ color: "black", cursor: "pointer",width:"max-content"}}
            >
              comments : {comments.length}
            </div>
        
          {comments !== null ? (
            comments.map((ele: any) => (
              <div
                className="p-2 Searchbox"
                onClick={() => {
                  // getprofile(ele.commenteduser);
                }}
                style={{ color: "black", cursor: "pointer",borderTop:"1px solid #ccc",borderBottom:"1px solid #ccc" }}
              >
                {ele.commenteduser} <br/>
                <p className="text-muted ml-4 mt-3 mb-0">{ele.message}</p> 
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </>
    )
}

export default Comments
