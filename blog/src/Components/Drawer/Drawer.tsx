import React from "react";
import "./Drawer.scss";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch,useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Drawer = (props: { data: { width: string } }) => {
  const currentindex = useSelector((state:RootState)=>state.currentindex);
  const dispatch = useDispatch();
  const [current, setcurrent] = React.useState(currentindex);
  const data: { name: string }[] = [
    {
        name: "Blog",
    },
    {
      name: "your profile",
    },
    {
        name:"chat"
    },
    {
        name:"liked pics"
    }
  ];
  return (
    <div className="Drawer">
      <div
        className="DrawerContainer shadow"
        style={{ width: props.data.width,zIndex:999 }}
      >
        <ul>
          {
              data.map((ele:{name:string},index:number)=>
                  (
                      <li id={(index===current)?"Drawerlicolor":""}
                      onClick={()=>{
                          dispatch({"type":"currentindex",payload:index})
                          setcurrent(index);
                      }}
                      >{ele.name}</li>
                  )
              )
          }
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
