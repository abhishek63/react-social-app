import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {viewUser} from '../user/apiUser'
import DeleteUser from "./DeleteUser";
import DefaultImage from "../images/avatar.png";


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
    let token = isAuthenticated().token;

    console.log("kamina",userId,token)
    viewUser(userId,token).then(data=>{
      if(data.error){
        console.log(data.error)
      }
      else{
        this.setState({
          user : data
        })
      }
    });
  }

  componentWillReceiveProps(props) {
    let userId = props.match.params.userId;
    let token = isAuthenticated().token;
    viewUser(userId,token).then(data=>{
      if(data.error){
        console.log(data.error)
      }
      else{
        this.setState({
          user : data
        })
      }
    });
  }

  render() {
    let userId = this.props.match.params.userId;

    const photoUrl = userId
    ? `${
          process.env.REACT_APP_API_URL
      }/api/user/photo/${userId}`
    : DefaultImage;


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
                  src={photoUrl}
                  class="img-fluid z-depth-1 rounded-circle"
                  width="200px"
                  height="200px"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-sm-8">
              <h2>{this.state.user.name}</h2>
              <h5>{this.state.user.email}</h5>
              <p class="lead">
                frontend programmer

              </p>
              <div className="row">
                <Link
                  to={`/user/edit/${this.state.user._id}`}
                  className="btn btn-success"
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={this.state.user._id} />
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
