import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import { Provider } from "react-redux";
import Store from "./redux/store";

export const Baseurl = "http://localhost:8000";

function App() {
  return (
    <Provider store={Store}>
      <Switch>
        <Route exact path="/main" component={Main}></Route>
        <Route exact path="" component={Home} />
      </Switch>
    </Provider>
  );
}

export default App;
