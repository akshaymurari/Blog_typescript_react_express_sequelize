import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Home from "./Components/Home/Home";
// import Signin from "./Components/Signin/Signin";
// import SignUp from "./Components/SignUp/SignUp";

function App() {
  return (
    <Switch>
      <Route exact path="" component={Home}/>
    </Switch>
  );
}

export default App;
