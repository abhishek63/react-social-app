import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/core/Home";
import Contact from "./components/core/Contact";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Profile from "./components/user/Profile";
import People from "./components/user/People";

export class MainRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/users" component={People} />
      </Switch>
    );
  }
}

export default MainRouter;
