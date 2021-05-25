import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
import { Baseurl } from "../../App";
import { useHistory } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "./Chat.scss";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
const Chat = () => {
  const classes = useStyles();
  const [value, setvalue] = React.useState("");
  const [showsearch, setshowsearch] = React.useState("none");
  const [onsearch, setonsearch] = React.useState([]);
  const [usernames, setusernames] = React.useState([]);
  const H = useHistory();
  React.useEffect(() => {
    const getfollowersorfollowing = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getfollowersorfollowing`,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: { token: localStorage.getItem("token"), data: value },
        });
        console.log(result.data);
        setonsearch(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getmychats = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getmychats`,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: { token: localStorage.getItem("token") },
        });
        console.log(result.data);
        setusernames(result.data);
        // setonsearch(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfollowersorfollowing();
    getmychats();
  }, [value]);
  return (
    <div className="chats">
      <div className="container">
        <div
          className="shadow"
          style={{ marginTop: "8rem", background: "", position: "relative" }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                searchuser
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setvalue(e.target.value);
                    setshowsearch("flex");
                  }}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div
                className="shadow bg-white"
                style={{
                  width: "14rem",
                  height: "18rem",
                  overflowY: "scroll",
                  display: showsearch,
                  flexDirection: "column",
                  position: "fixed",
                  transform: "translateX(-50%)",
                  left: "50%",
                  top: "11rem",
                  borderRadius: "0.3rem",
                  flexWrap: "wrap",
                  wordWrap: "break-word",
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
                  onClick={() => {
                    setshowsearch("none");
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
                {onsearch.map((ele: string, index) => (
                  <div
                    className="p-3 Searchbox"
                    onClick={() => {
                      H.push(`/chat/${ele}`);
                    }}
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    {ele}
                  </div>
                ))}
              </div>
            </Toolbar>
          </AppBar>
          {usernames.map((ele: string, index) => (
            <div
              className="p-3 Searchbox"
              onClick={() => {
                H.push(`/chat/${ele}`);
              }}
              style={{ color: "black", cursor: "pointer" }}
            >
              {ele}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
