import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";


export const Baseurl = "http://localhost:8080";

function App() {
  return (
    <Switch>
      <Route exact path="/Main" component={Main}></Route>
      <Route exact path="" component={Home}/>
    </Switch>
  );
}

export default App;
