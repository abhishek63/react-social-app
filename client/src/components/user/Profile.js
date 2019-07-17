import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DeleteUser from "./DeleteUser";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToHome: false
    };
  }

  componentDidMount() {
    //fetch user details
    let userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    let userId = props.match.params.userId;
    this.init(userId);
  }

  init = userId => {
    return fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.setState({
            redirectToHome: true
          });
        } else {
          console.log(data);
          this.setState({
            user: data
          });
        }
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <div class="jumbotron mt-2">
          <div className="row">
            <div className="col-sm-4">
              <div className="text-center">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                  class="img-fluid z-depth-1 rounded-circle"
                  alt="Responsive image"
                  width="150px"
                />
              </div>
            </div>
            <div className="col-sm-8">
              <h2>{this.state.user.name}</h2>
              <p class="lead">
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <div className="row">
                <button className="btn btn-success">Edit Profile</button>
                <DeleteUser userId={this.state.user._id}/>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;
