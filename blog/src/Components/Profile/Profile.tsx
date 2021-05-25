import React from "react";
import "./Profile.scss";
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
import Comments from "../Comments/Comments";
const Profile = () => {
  const dispatch = useDispatch();
  const [likes, setlikes] = React.useState<{ color: string; likes: any }[]>([]);
  console.log(likes);
  const [data, setdata] = React.useState({
    username: "",
    profilepic: "https://source.unsplash.com/random",
    bio: "",
    followers: [],
    following: [],
    posts: 0,
  });
  
  const post = useSelector((state:RootState)=> state.post);
  const [vis, setvis] = React.useState({
    followers: "none",
    following: "none",
  });
  const H = useHistory();
  React.useEffect(() =>{
    const getposts = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getposts`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          data: { token: localStorage.getItem("token") },
        });
        console.log(result.data.data);
        const arr: any = result.data.data;
        const likesarr: { color: string; likes: any }[] = [];
        for (var i = 0; i < arr.length; i++) {
          let res = false;
          for (var j = 0; j < arr[i].likes.length; j++) {
            if (arr[i].likes[j].likedusername === result.data.username) {
              likesarr.push({ color: "red", likes: arr[i].likes });
              res = true;
              break;
            }
          }
          if (!res) {
            likesarr.push({ color: "black", likes: arr[i].likes });
          }
        }
        setlikes(likesarr);
        dispatch({ type: "myposts", payload: result.data.data });
        setdata((pre) => ({ ...pre, posts: result.data.data.length }));
      } catch {}
    };
    getposts();
  },[post]);
  React.useEffect(() => {
    const func = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getprofilepic`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          data: { token: localStorage.getItem("token") },
        });
        console.log(result.data);
        setdata((pre) => ({ ...pre, username: result.data.username }));
        dispatch({ type: "editdetails", payload: { bio: result.data.bio } });
        dispatch({ type: "profilepic", payload: result.data.profilepic });
      } catch {}
    };
   
    const getfollowersandfollowing = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/getourfollowing`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          data: { token: localStorage.getItem("token") },
        });
        console.log(result.data);
        setdata((pre) => ({
          ...pre,
          following: result.data.following,
          followers: result.data.followers,
        }));
      } catch {}
    };
    getfollowersandfollowing();
    func();
  }, []);
  const [comments, setcomments] = React.useState([]);
  const [showcomments, setshowcomments] = React.useState({
    display: "none",
    id: 0,
  });
  const getcomments = async (id: number) => {
    console.log(id);
    try {
      const result = await axios({
        method: "post",
        url: `${Baseurl}/getcomments`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { token: localStorage.getItem("token"), id },
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const close = () => {
    setshowcomments({ display: "none", id: 0 });
  };
  const editdetails = useSelector((state: RootState) => state.editdetails);
  const [showlikes, setshowlikes] = React.useState({
    display: "none",
    index: 0,
  });
  const profilepic = useSelector((state: RootState) => state.profilepic);
  const myposts = useSelector((state: RootState) => state.myposts);
  data.profilepic = profilepic;
  const getprofile = async (username: string) => {
    H.push(`/getuser/${username}`);
  };
  const like = async (status: string, id: number, index: number) => {
    console.log(status);
    try {
      const result = await axios({
        method: "post",
        url: `${Baseurl}/${status}`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { token: localStorage.getItem("token"), id },
      });
      console.log(result.data);
      if (status === "unlike") {
        const arr = [1];
        setlikes((pre) => {
          pre[index].likes = pre[index].likes.filter(
            (ele: { likedusername: string }) => {
              return ele.likedusername != data.username;
            }
          );
          pre[index].color = "black";
          return [...pre];
        });
      } else {
        setlikes((pre) => {
          pre[index] = {
            color: "red",
            likes: [
              ...pre[index].likes,
              {
                ...result.data,
              },
            ],
          };
          return [...pre];
        });
      }
    } catch {}
  };
  data.bio = editdetails.bio;
  const deletepost = async (id: number) => {
    console.log(id);
    try {
      const result = await axios({
        method: "post",
        url: `${Baseurl}/deletepost`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { token: localStorage.getItem("token"), id },
      });
      dispatch({
        type: "post",
        payload: !post,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Profile mt-5">
      <div className="container" style={{ marginTop: "8rem" }}>
        <div className="row">
          <div className="col-md-4 offset-md-1">
            <img
              id="profilepic"
              src={data.profilepic}
              alt="image not uploaded"
            />
            <h4 className="text-center mb-5" style={{ fontWeight: "normal" }}>
              {data.username}
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
                <li className="text-center">{data.following.length}</li>{" "}
                <br></br>
                <li
                  className="text-center"
                  onClick={() => {
                    setvis((pre) => ({ followers: "none", following: "flex" }));
                  }}
                >
                  following
                </li>
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
                      width: "max-content",
                      left: "100%",
                      transform: "translate(-100%,30%)",
                      // bottom:"1rem"
                      marginBottom: "0.3rem",
                    }}
                    onClick={() => {
                      setvis((pre) => ({ ...pre, following: "none" }));
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
                  {data.following !== null ? (
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
                {/* </div> */}
              </div>
              <div style={{ width: "max-content", cursor: "pointer" }}>
                <li className="text-center">{data.followers.length}</li>{" "}
                <br></br>
                <li
                  className="text-center"
                  onClick={() => {
                    setvis((pre) => ({ following: "none", followers: "flex" }));
                  }}
                >
                  followers
                </li>
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
                      width: "max-content",
                      left: "100%",
                      transform: "translate(-100%,30%)",
                      // bottom:"1rem"
                      marginBottom: "0.3rem",
                    }}
                    onClick={() => {
                      setvis((pre) => ({ ...pre, followers: "none" }));
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
                <li className="text-center">{data.posts}</li> <br></br>
                <li className="text-center">posts</li>
              </div>
            </ul>
            <div
              className="mx-auto mt-5"
              style={{ width: "max-content", cursor: "pointer" }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch({ type: "editbackdrop", payload: true });
                }}
              >
                edit profile
              </Button>
            </div>
            <div>
              <p className="mt-5 text-center">{data.bio}</p>
            </div>
          </div>
        </div>
        {/* <div className="row mt-5"> */}
        <Fab
          aria-label="add"
          className="text-white"
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "#3f50b5",
          }}
          onClick={() => {
            dispatch({ type: "addbackdrop", payload: true });
          }}
        >
          <AddIcon />
        </Fab>
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
          {likes[showlikes.index] !== undefined &&
          likes[showlikes.index] !== null ? (
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
        <Comments
          data={{ display: showcomments.display, id: showcomments.id, close }}
        />
        <div
          className="posts mt-5 ml-0"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {myposts.map((ele, index) => (
            <div className="post shadow p-5 mx-3">
              <img src={ele.pic} alt="" style={{ maxWidth: "300px" }} />
              <p className="mt-3 text-center">{ele.tagline}</p>
              <div style={{ width: "max-content", margin: "auto" }}>
                {likes[index] != undefined ? (
                  <>
                    <p style={{ cursor: "pointer" }}>
                      <span
                        onClick={() => {
                          setshowlikes({ display: "flex", index });
                        }}
                      >
                        likes : {likes[index].likes.length} &nbsp;
                      </span>
                      <FavoriteBorderIcon
                        className=""
                        onClick={() =>
                          like(
                            likes[index].color == "black" ? "like" : "unlike",
                            ele.id,
                            index
                          )
                        }
                        style={{ color: likes[index].color, cursor: "pointer" }}
                      />
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="m-0"
                        style={{ width: "max-content" }}
                        onClick={() =>
                          setshowcomments({
                            display: "flex",
                            id: ele.id,
                          })
                        }
                      >
                        comments
                      </div>
                      <div style={{ width: "max-content", marginTop: "-1rem" }}>
                        <IconButton onClick={()=> deletepost(ele.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Profile;
