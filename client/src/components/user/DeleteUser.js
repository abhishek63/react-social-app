import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";

export class DeleteUser extends Component {
  constructor(){
    super();
    this.state={
      redirectToHome : false
    }
  }
  //delete user
  deleteUser = () => {
    //extract token
    let token = isAuthenticated().token;
    let userId = this.props.userId;
    fetch(`/api/user/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log("error", data.error);
        } else {
          //signout
          signout(()=>console.log("user is deleted"))
          //redirect
          this.setState({
            redirectToHome : true
          })
        }
      });
  };

  //prompting user
  deletePrompt = () => {
    let answer = window.confirm("Are you sure to want to delete account");
    if (answer) {
      console.log("success");
      this.deleteUser();
    }
  };

  render() {
    if(this.state.redirectToHome)
    return <Redirect to="/" />
    return (
      <div>
        <button className="btn btn-danger" onClick={this.deletePrompt}>
          Delete Profile
        </button>
      </div>
    );
  }
}

export default DeleteUser;
