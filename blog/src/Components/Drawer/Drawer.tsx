import React from "react";
import "./Drawer.scss";
import IconButton from "@material-ui/core/IconButton";

const Drawer = (props: { data: { width: string } }) => {
  const [current, setcurrent] = React.useState(0);
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
        style={{ width: props.data.width }}
      >
        <ul>
          {
              data.map((ele:{name:string},index:number)=>
                  (
                      <li id={(index===current)?"Drawerlicolor":""}
                      onClick={()=>{
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
