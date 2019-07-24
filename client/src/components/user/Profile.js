import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { viewUser } from "../user/apiUser";
import DeleteUser from "./DeleteUser";
import DefaultImage from "../images/avatar.png";
import FollowUnfollowButton from "./FollowUnfollowButton";
import ProfileTabs from "./ProfileTabs";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToHome: false,
      following: false,
      error: "",
      posts: []
    };
  }

  // check follow
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      console.log(follower._id, "xyxyyxyx");
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    console.log("uske baad", callApi);
    const userId = isAuthenticated().user._id;
    let token = isAuthenticated().token;
    console.log("uske baad", userId, this.state.user._id);

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  init = userId => {
    const token = isAuthenticated().token;
    viewUser(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToHome: true });
      } else {
        let following = this.checkFollow(data);
        console.log("sayad", following);
        this.setState({ user: data, following });
        // this.loadPosts(data._id);
      }
    });
  };

  render() {
    let userId = this.props.match.params.userId;

    const photoUrl = userId
      ? `${process.env.REACT_APP_API_URL}/api/user/photo/${userId}`
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
              <p class="lead">frontend programmer</p>
              {isAuthenticated().user &&
              isAuthenticated().user._id === this.state.user._id ? (
                <div className="row">
                  <Link
                    to={`/user/edit/${this.state.user._id}`}
                    className="btn btn-success"
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={this.state.user._id} />
                </div>
              ) : (
                <FollowUnfollowButton
                  following={this.state.following}
                  onButtonClick={this.clickFollowButton}
                />
              )}
            </div>
          </div>

          <hr class="my-4" />
          <ProfileTabs
            followers={this.state.user.followers}
            following={this.state.user.following}
          />
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
