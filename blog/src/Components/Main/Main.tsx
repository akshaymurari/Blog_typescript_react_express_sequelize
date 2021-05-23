import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Drawer from "../Drawer/Drawer";
import $ from "jquery";
import "./Main.scss";
import Profile from "../Profile/Profile";
import Blog from "../Blog/Blog";
import { useSelector,useDispatch } from "react-redux";
import {RootState} from "../../redux/store";
import EditBackdrop from "../EditBackdrop/EditBackdrop";
import AddBackdrop from "../AddBackdrop/AddBackdrop";
import {Baseurl} from "../../App";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
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

const Main = () => {
  const dispatch = useDispatch();
  const H = useHistory();
  const searchblog = useSelector((state:RootState)=>state.onsearch);
  const [width,setwidth] = React.useState("0px");
  const currentindex = useSelector((state:RootState)=> state.currentindex);
  const editbackdrop= useSelector((state:RootState)=> state.editbackdrop);
  const [value,setvalue] = React.useState("");
  const arr = [<Blog/>,<Profile/>];
  const [displays,setdisplays] = React.useState("none");
  const onsearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
    setdisplays("flex");
    try{
      const result = await axios({
        method:"post",
        url:`${Baseurl}/onsearch`,
        headers:{
          "accept":"application/json",
          "content-type":"application/json"
        },
        data:{token:localStorage.getItem("token"),username:e.target.value}
      });
      console.log(result.data);
      dispatch({type:'onsearch',payload:result.data})
    }catch{

    }
  }
  console.log(searchblog);
  const getprofile = (details:any) => {
    console.log(details);
    dispatch({"type":"currentprofile",payload:details})
    H.push(`/getuser/${details.username}`)
  }
  const classes = useStyles();
  return (
    <div className={classes.root} id="Main" style={{height:"100vh",display:"fixed",zIndex:99999}} onClick={()=>{
      setdisplays("none");
    }}>
      {
        (editbackdrop)?(
          <EditBackdrop/>
          ):(
            <AddBackdrop/>
          )
      }
      <Drawer data={{width}}/>
      <AppBar position="static" style={{position:"fixed",zIndex:9999,top:0}}>
        <Toolbar>
          <IconButton
            onClick={
                ()=>{
                    setwidth((pre)=>{
                        if(pre==="0px"){
                            return "250px";
                        }
                        else{
                            return "0px";
                        }
                    });
                }
            }
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            BlogApp
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={onsearch}
              value={value}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
              <div className="shadow bg-white" 
              style={{width:"14rem",height:"18rem",
              overflowY:"scroll",display:displays,flexDirection:"column",position:"fixed",
                      transform:"translateX(-60%)",
                      left:"85%",top:"3.2rem",borderRadius:"0.3rem",flexWrap:"wrap",wordWrap:"break-word"}}>
                {
                  searchblog.map((ele:any,index)=>(
                    <div className="p-3 Searchbox" 
                      onClick={()=>{getprofile(ele)}}
                      style={{color:"black",cursor:"pointer"}}>{ele.username}</div>
                  ))
                }
              </div>
        </Toolbar>
      </AppBar>
      <div className="container">
        {
          arr[currentindex]
        }
      </div>
    </div>
  );
};

export default Main;
