import React from "react";
import "./Getuser.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Baseurl } from "../../App";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Comments from '../Comments/Comments';


const Getuser = (props:any) => {
  const username=props.match.params.username;
  const [likes, setlikes] = React.useState<({color:string,likes:any})[]>([]);
  console.log(likes);
  const [currentprofile,setcurrentprofile]= React.useState<any>({});
  const H = useHistory();
  const [followingstatus, setfollowingstatus] = React.useState("follow");
  const [following, getfollowing] = React.useState([]);
  const [followadd, setfollowadd] = React.useState(false);
  const [getfollowingstats, setgetfollowingstats] = React.useState(false);
  console.log(currentprofile);
  const [profileposts,setprofileposts] = React.useState<boolean>(false);
  const [vis,setvis] = React.useState({
    followers:"none",
    following:"none"
  })
  const [data, setdata] = React.useState({
    username: "",
    profilepic: "https://source.unsplash.com/random",
    bio: "",
    followers: [],
    following: [],
    posts: 0,
  });
  console.log(data);
  const [showcomments,setshowcomments] = React.useState({
    display:"none",
    id:0
  });
  const close = () => {
    setshowcomments({display:"none",id:0})
  }
  React.useEffect(() => {
    const getprofile = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getprofile`,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: {
            token: localStorage.getItem("token"),
            username:username,
          },
        });
        console.log(result.data);
        const arr: any = result.data.posts;
        const likesarr:({color:string,likes:any})[] = [];
        for (var i = 0; i < arr.length; i++) {
          let res=false;
          for (var j = 0; j < arr[i].likes.length; j++) {
            if(arr[i].likes[j].likedusername===result.data.userUser){
              likesarr.push({color:"red",likes:arr[i].likes});
              res=true;
              break;
            }
          }
          if(!res){
            likesarr.push({color:"black",likes:arr[i].likes});
          }
        }
        setlikes(likesarr);
        setcurrentprofile(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getprofile();
  }, [profileposts]);
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
            username: username,
          },
        });
        console.log(result.data);
        setfollowingstatus(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfollowingstatus();
  }, [getfollowingstats]);
  React.useEffect(() => {
    const getfollowersandfollowing = async () => {
      try{
        const result = await axios({
          method:"post",
          url:`${Baseurl}/getfollowing`,
          headers:{
            "Content-Type":"application/json",
            accept:"application/json"
          },
          data:{token:localStorage.getItem("token"),username}
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
  const [showlikes,setshowlikes] = React.useState({display:"none",index:0});
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
          username: username,
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
  const like = async (status:string,id:number,index:number) => {
    console.log(status,id,index);
    try {
      const result = await axios({
        method: "post",
        url: `${Baseurl}/${status}`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { token: localStorage.getItem("token"),id },
      });
      console.log(result.data);
      setprofileposts(!profileposts);
    } catch {}
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
                    setvis({followers:"none",following:"flex"})
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
                    setvis({followers:"flex",following:"none"})
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
                  className="shadow bg-white"
                  style={{
                    width: "14rem",
                    height: "18rem",
                    overflowY: "scroll",
                    display: showlikes.display,
                    flexDirection: "column",
                    position: "fixed",
                    transform: "translate(-50%,-50%)",
                    left: "50%",
                    top: "50%",
                    borderRadius: "0.3rem",
                    flexWrap: "wrap",
                    wordWrap: "break-word",
                    zIndex: 999,
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
                      setshowlikes((pre) => ({ ...pre, display: "none" }));
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  {/* <div
                      className="p-3 pb-3 mb-4 mt-3 mx-auto"
                      onClick={() => {
                        // getprofile(ele);
                      }}
                      style={{ color: "black", cursor: "pointer",width:"max-content",position:"fixed"}}
                    >
                      followers
                    </div> */}
                  {(likes[showlikes.index] !== undefined && likes[showlikes.index] !== null )? (
                    likes[showlikes.index].likes.map((ele: any) => (
                      <div
                        className="p-3 Searchbox"
                        onClick={() => {
                          getprofile(ele.likedusername);
                        }}
                        style={{ color: "black", cursor: "pointer" }}
                      >
                        {ele.likedusername}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
        <div
          className="posts mt-5 ml-0"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Comments data={{display:showcomments.display,id:showcomments.id,close}}/>
          {currentprofile.posts.map((ele:any, index:any) => (
            <div className="post mx-3">
              <img src={ele.pic} alt="" style={{ maxWidth: "300px" }} />
              <p className="mt-3 text-center">{ele.tagline}</p>
              <div style={{width:"max-content",margin:"auto"}}>
                {
                  (likes[index]!=undefined)?(
                    <>
                    <p style={{cursor:"pointer"}}>
                      <span onClick={
                        ()=>{
                          setshowlikes({display:"flex",index})
                        }
                      }>likes : {likes[index].likes.length} &nbsp;</span>
                      <FavoriteBorderIcon className="" 
                      onClick={()=>like((likes[index].color=="black")?"like":"unlike",ele.id,index)}
                      style={{color:likes[index].color,cursor:"pointer"}}/>
                    </p>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",cursor:"pointer"}}>
                        <div className="m-0" style={{width:"max-content"}}
                        onClick={()=>
                          setshowcomments({
                            display:"flex",
                            id:ele.id
                          })
                        }
                        >comments</div>
                      </div>
                    </>
                  ):(
                    <></>
                  )
                }
              </div>
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

export default Getuser;
