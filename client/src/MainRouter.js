import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/core/Home";
import Contact from "./components/core/Contact";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Profile from "./components/user/Profile";
import People from "./components/user/People";
import EditProfile from "./components/user/EditProfile";
import NewPost from "./components/post/NewPost";
import Posts from "./components/post/Posts";

export class MainRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/user/:userId" exact component={Profile} />
        <Route path="/user/edit/:userId" exact component={EditProfile} />
        <Route path="/users" exact component={People} />
        <Route exact path="/post/create" component={NewPost} />
        <Route exact path="/posts" component={Posts} />

      </Switch>
    );
  }
}

export default MainRouter;
