import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Baseurl } from "../../App";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import Comments from "../Comments/Comments";

const Likedpics = () => {
  const H = useHistory();
  const [myposts, setmyposts] = React.useState(new Array());
  const [username, setusername] = React.useState("");
  console.log(myposts);
  const [likes, setlikes] = React.useState<{ color: string; likes: any }[]>([]);
  const [showcomments, setshowcomments] = React.useState({
    display: "none",
    id: 0,
  });
  const close = () => {
    setshowcomments({ display: "none", id: 0 });
  };
  const [showlikes, setshowlikes] = React.useState({
    display: "none",
    index: 0,
  });
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
              return ele.likedusername != username;
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
  React.useEffect(() => {
    const followingposts = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${Baseurl}/followingposts`,
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          data: { token: localStorage.getItem("token") },
        });
        console.log(result.data);
        setmyposts(result.data.data);
        setusername(result.data.username);
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
      } catch (error) {
        console.log(error);
      }
    };
    followingposts();
  }, []);
  const getprofile = async (username: string) => {
    H.push(`/getuser/${username}`);
  };
  try {
    return (
      <div className="Followingposts" style={{ marginTop: "8rem" }}>
        <div className="container mt-5">
          <div
            className="shadow bg-white"
            style={{
              width: "14rem",
              height: "18rem",
              overflowY: "scroll",
              display: showlikes.display,
              flexDirection: "column",
              position: "fixed",
              transform: "translateX(-50%)",
              left: "50%",
              top: "8rem",
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
          {myposts.map((ele: any, index) => (likes[index].color=="red")?(
            <div className="my-5">
              <img
                src={ele.pic}
                alt=""
                style={{ maxWidth: "300px", display: "block", margin: "auto" }}
              />
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
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ):(<></>))}
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <></>;
  }
};

export default Likedpics;
