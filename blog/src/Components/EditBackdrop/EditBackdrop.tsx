import * as React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import "./EditBackdrop.scss";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import EditProfilePic from "../EditProfilePic/EditProfilePic";
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
const EditBackdrop = () => {
  const classes = useStyles();
  const editbackdrop = useSelector((state: RootState) => state.editbackdrop);
  const editdetails = useSelector((state: RootState) => state.editdetails);
  const profilepic = useSelector((state: RootState) => state.profilepic);
  const [value,setvalue] = React.useState("");
  const dispatch = useDispatch();
  console.log(editbackdrop);

  const handleClose = () => {
    dispatch({ type: "editbackdrop", payload: !editbackdrop });
  };

  const saveeditedvalues = async () => {
      try{
          const result = await axios({
              method:"post",
              url:`${Baseurl}/profilepic`,
              headers: {
                  "content-type":"application/json",
                  accept: "application/json"
              },
              data:{token:localStorage.getItem("token"),bio:value,profilepic}
          });
          dispatch({type:"editdetails",payload:{bio:value}});
      }
      catch{

      }
  }

  return (
    <div className="EditBackdrop ">
      <Backdrop className={classes.backdrop} open={editbackdrop}>
        <div
          className="shadow editor pb-4"
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
          <EditProfilePic/>
          <div style={{ width: "max-content", margin: "auto" }}>
            <h5 className="text-center mt-5 mb-3" style={{ color: "#000" }}>
              BIO
            </h5>
            <TextField
              rows={4}
              multiline
              value={value}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  setvalue(e.target.value);
                // dispatch({
                //   type: "editdetails",
                //   payload: { bio: e.target.value },
                // });
              }}
              variant="outlined"
            />
          </div>
          <Button variant="contained" color="primary"
          onClick={saveeditedvalues}
          >Save</Button>
        </div>
      </Backdrop>
    </div>
  );
};

export default EditBackdrop;
