import * as React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import "./AddBackdrop.scss";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import EditPostPic from "../AddPostPic/EditPostPic";
import axios from "axios";
import {Baseurl} from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
const AddBackdrop = () => {
  const classes = useStyles();
  const addbackdrop = useSelector((state: RootState) => state.addbackdrop);
  const postpic = useSelector((state: RootState) => state.postpic);
  const post = useSelector((state: RootState) => state.post);

  const [value,setvalue] = React.useState("");
  const dispatch = useDispatch();
//   console.log(postpic);

  const handleClose = () => {
    dispatch({ type: "addbackdrop", payload: !addbackdrop });
  };

  const saveAddedvalues = async () => {
      try{
          const result = await axios({
              method:"post",
              url:`${Baseurl}/addposts`,
              headers: {
                  "content-type":"application/json",
                  accept: "application/json"
              },
              data:{token:localStorage.getItem("token"),tagline:value,profilepic:postpic}
          });
          console.log(result.data);
          dispatch({type:"post",payload: !post});
      }
      catch{

      }
  }

  return (
    <div className="AddBackdrop ">
      <Backdrop className={classes.backdrop} open={addbackdrop}>
        <div
          className="shadow Addor pb-4"
          style={{
            background: "white",
            overflow:"scroll",
            position: "fixed",
            height: "70vh",
            width: "70vw",
            top: "50%",
            display: "block",
            transform: "translateY(-50%)",
          }}
        >
          <div style={{ width: "max-content", margin: "0.5rem 0.5rem auto auto" }}>
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </div>
          <EditPostPic/>
          <div style={{ width: "max-content", margin: "auto" }}>
            <h5 className="text-center mt-5 mb-3" style={{ color: "#000" }}>
              Tagline
            </h5>
            <TextField
              value={value}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  setvalue(e.target.value);
              }}
              variant="outlined"
            />
          </div>
          <Button variant="contained" color="primary"
          onClick={saveAddedvalues}
          >Save</Button>
        </div>
      </Backdrop>
    </div>
  );
};

export default AddBackdrop;
