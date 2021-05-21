import React from "react";
import "./Profile.scss";
import Button from "@material-ui/core/Button";
import {useDispatch,useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import axios from "axios";
import {Baseurl} from "../../App";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
const Profile = () => {
  const dispatch = useDispatch();
  const [data, setdata] = React.useState({
    username: "",
    profilepic: "https://source.unsplash.com/random",
    bio:"",
    followers: 0,
    following: 0,
    posts:0,
  });
  React.useEffect(()=>{
    const func = async () => {
    try{
      const result = await axios({
        method:"post",
        url:`${Baseurl}/getprofilepic`,
        headers:{
          "Content-Type":"application/json",
          accept:"application/json"
        },
        data:{token:localStorage.getItem("token")}
      });
      console.log(result.data);
      setdata((pre)=>({...pre,username:result.data.username}));
      dispatch({"type":"editdetails",payload:{bio:result.data.bio}});
      dispatch({"type":"profilepic",payload:result.data.profilepic});
    }
    catch{

    }
  }
  const getposts = async () => {
    try{
      const result = await axios({
        method:"post",
        url:`${Baseurl}/getposts`,
        headers:{
          "Content-Type":"application/json",
          accept:"application/json"
        },
        data:{token:localStorage.getItem("token")}
      });
      console.log(result.data.data);
      dispatch({type:"myposts", payload:result.data.data});
      setdata((pre)=>({...pre,posts:result.data.data.length}));
    }
    catch{
    }
  }
   func();
   getposts();
  },[]);
  const editdetails = useSelector((state: RootState) => state.editdetails);
  const profilepic = useSelector((state: RootState) => state.profilepic);
  const myposts = useSelector((state:RootState) => state.myposts);
  data.profilepic = profilepic;
  
  data.bio=editdetails.bio;
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
            <h4 className="text-center mb-5" style={{fontWeight:"normal"}}>{data.username}</h4>
          </div>
          <div className="col-md-5" style={{marginLeft:0}}>
            <ul className="m-0 p-0" style={{ display: "flex", justifyContent: "space-around",flexWrap:"wrap" }}>
              <div style={{ width: "max-content",cursor: "pointer"}}>
                <li className="text-center">{data.following}</li> <br></br>
                <li className="text-center">following</li>
              </div>
              <div style={{ width: "max-content",cursor: "pointer" }}>
                <li className="text-center">{data.followers}</li> <br></br>
                <li className="text-center">followers</li>
              </div>
              <div style={{ width: "max-content",cursor: "pointer"}}>
                <li className="text-center">{data.posts}</li> <br></br>
                <li className="text-center">posts</li>
              </div>
            </ul>
            <div className="mx-auto mt-5" style={{width: "max-content",cursor: "pointer"}}>
                <Button variant="outlined" color="primary"
                 onClick={()=>{
                     dispatch({"type":"editbackdrop",payload:true});
                 }}
                >edit profile</Button>
            </div>
            <div>
                <p className="mt-5 text-center">
                   {data.bio}
                </p>
            </div>
          </div>
        </div>
        {/* <div className="row mt-5"> */}
        <Fab aria-label="add" 
         className="text-white"
         style={{position:"fixed",bottom:"0",left:"50%",transform:"translate(-50%,-50%)",background:"#3f50b5"}}
         onClick={()=>{
           dispatch({type:"addbackdrop",payload:true});
         }}
         >
        <AddIcon />
      </Fab>
            <p className="text-uppercase text-center pt-4" style={{borderTop:"2px solid #eee"}}>posts</p>
            <div className="posts mt-5 ml-0" 
            style={{display:"flex",justifyContent:"space-around",marginBottom:"2rem",flexWrap:"wrap"}}
            >
              {
                myposts.map((ele,index)=>(
                  <div className="post mx-3">
                    <img src={ele.pic} alt="" style={{maxWidth:"300px"}} />
                    <p className="mt-3">{ele.tagline}</p>

                  </div>
                ))
              }
            </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Profile;
