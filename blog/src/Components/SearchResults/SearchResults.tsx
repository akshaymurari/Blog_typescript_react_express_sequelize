import React from "react";
import "./SearchResults.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Baseurl } from "../../App";

const SearchResults = () => {
  const currentprofile: any = useSelector(
    (state: RootState) => state.currentprofile
  );
  const [vis,setvis] = React.useState({
    followers:"none",
    following:"none"
  })
  const H = useHistory();
  const [followingstatus, setfollowingstatus] = React.useState("follow");
  const [following, getfollowing] = React.useState([]);
  const [followadd, setfollowadd] = React.useState(false);
  const [getfollowingstats, setgetfollowingstats] = React.useState(false);
  console.log(currentprofile);
  const [data, setdata] = React.useState({
    username: "",
    profilepic: "https://source.unsplash.com/random",
    bio: "",
    followers: [],
    following: [],
    posts: 0,
  });
  console.log(data);
  React.useEffect(() => {
    const getfollowingstatus = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getfollowingstatus`,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: {
            token: localStorage.getItem("token"),
            username: currentprofile.username,
          },
        });
        console.log(result.data);
        setfollowingstatus(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  getfollowingstatus();
  // getfollowersandfollowing();
  }, [getfollowingstats]);
  React.useEffect(() => {
    const getfollowersandfollowing = async () => {
      try{
        const result = await axios({
          method:"post",
          url:`${Baseurl}/getourfollowing`,
          headers:{
            "Content-Type":"application/json",
            accept:"application/json"
          },
          data:{token:localStorage.getItem("token")}
        });
        console.log(result.data);
        setdata((pre)=>({...pre,following:result.data.following,followers:result.data.followers}));
      }
      catch{
  
      }
  }
  getfollowersandfollowing();
  }, [followadd]);
  console.log(currentprofile);
  const followop = async () => {
    try {
      const result = await axios({
        url: `${Baseurl}/follow`,
        method: "post",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          token: localStorage.getItem("token"),
          username: currentprofile.username,
        },
      });
      console.log(result.data);
      setfollowadd((pre) => !pre);
      setgetfollowingstats((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };
  const getprofile = async (username:string) => {
    H.push(`/getuser/${username}`);
  }
  try {
    return (
      <div className="Profile mt-5">
        <div className="container" style={{ marginTop: "8rem" }}>
          <div className="row">
            <div className="col-md-4 offset-md-1">
              <img
                id="profilepic"
                src={
                  currentprofile.profile !== null &&
                  currentprofile.profile.profilepic !== null
                    ? currentprofile.profile.profilepic
                    : "https://source.unsplash.com/random"
                }
                alt="image not uploaded"
              />
              <h4 className="text-center mb-5" style={{ fontWeight: "normal" }}>
                {currentprofile.username}
              </h4>
            </div>
            <div className="col-md-5" style={{ marginLeft: 0 }}>
              <ul
                className="m-0 p-0"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ width: "max-content", cursor: "pointer" }}>
                  <li className="text-center">{data.following.length}</li> <br></br>
                  <li className="text-center" onClick={()=>{
                    setvis((pre)=>({followers:"none",following:"flex"}));
                  }}>following</li>
                  <div
                    className="shadow bg-white"
                    style={{
                      width: "14rem",
                      height: "18rem",
                      overflowY: "scroll",
                      display: vis.following,
                      flexDirection: "column",
                      position: "fixed",
                      transform: "translateX(-50%)",
                      left: "50%",
                      top: "3.2rem",
                      borderRadius: "0.3rem",
                      flexWrap: "wrap",
                      wordWrap: "break-word",
                      zIndex: 999,
                    }}
                  >
                    <IconButton
                      style={{
                        // position:"fixed",
                        width:"max-content",
                        left:"100%",
                        transform: "translate(-100%,30%)",
                        // bottom:"1rem"
                        marginBottom:"0.3rem"
                      }}
                      onClick={()=>{
                        setvis((pre)=>({...pre,following:"none"}))
                      }}
                    >
                       <HighlightOffIcon/>
                    </IconButton>
                    {data.following!== null ? (
                      data.following.map((ele: any) => (
                        <div
                          className="p-3 Searchbox"
                          onClick={() => {
                            getprofile(ele.userUsername);
                          }}
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          {ele.userUsername}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div style={{ width: "max-content", cursor: "pointer" }}>
                  <li className="text-center">{data.followers.length}</li> <br></br>
                  <li className="text-center" onClick={()=>{
                    setvis((pre)=>({following:"none",followers:"flex"}));
                  }}>followers</li>
                  <div
                    className="shadow bg-white"
                    style={{
                      width: "14rem",
                      height: "18rem",
                      overflowY: "scroll",
                      display: vis.followers,
                      flexDirection: "column",
                      position: "fixed",
                      transform: "translateX(-50%)",
                      left: "50%",
                      top: "3.2rem",
                      borderRadius: "0.3rem",
                      flexWrap: "wrap",
                      wordWrap: "break-word",
                      zIndex: 999,
                    }}
                  >
                    <IconButton
                      style={{
                        // position:"fixed",
                        width:"max-content",
                        left:"100%",
                        transform: "translate(-100%,30%)",
                        // bottom:"1rem"
                        marginBottom:"0.3rem"
                      }}
                      onClick={()=>{
                        setvis((pre)=>({...pre,followers:"none"}))
                      }}
                    >
                       <HighlightOffIcon/>
                    </IconButton>
                    {data.followers !== null ? (
                      data.followers.map((ele: any) => (
                        <div
                          className="p-3 Searchbox"
                          onClick={() => {
                            getprofile(ele.username);
                          }}
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          {ele.username}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div style={{ width: "max-content", cursor: "pointer" }}>
                  <li className="text-center">
                    {currentprofile.posts !== null
                      ? currentprofile.posts.length
                      : "0"}
                  </li>{" "}
                  <br></br>
                  <li className="text-center">posts</li>
                </div>
              </ul>
              <div
                className="mx-auto mt-5"
                style={{ width: "max-content", cursor: "pointer" }}
              >
                <Button variant="outlined" color="primary" onClick={followop}>
                  {followingstatus}
                </Button>
              </div>
              <div>
                <p className="mt-5 text-center">
                  {currentprofile.profile !== null &&
                  currentprofile.profile.bio !== null
                    ? currentprofile.profile.bio
                    : ""}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="row mt-5"> */}
          {/* <Fab aria-label="add" 
           className="text-white"
           style={{position:"fixed",bottom:"0",left:"50%",transform:"translate(-50%,-50%)",background:"#3f50b5"}}
           onClick={()=>{
             dispatch({type:"addbackdrop",payload:true});
           }}
           >
          <AddIcon />
        </Fab> */}
          <p
            className="text-uppercase text-center pt-4"
            style={{ borderTop: "2px solid #eee" }}
          >
            posts
          </p>
          <div
            className="posts mt-5 ml-0"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {currentprofile.posts.map((ele: any) => (
              <div className="post mx-3">
                <img src={ele.pic} alt="" style={{ maxWidth: "300px" }} />
                <p className="mt-3">{ele.tagline}</p>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  } catch(error) {
    console.log(error);
    return <></>;
  }
};

export default SearchResults;
