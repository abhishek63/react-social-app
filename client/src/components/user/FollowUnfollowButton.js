import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

export class FollowUnfollowButton extends Component {
    constructor(props){
        super(props);
    }
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

 render() {
        return (
            <div className="d-inline-block">
                {
                    console.log("props wala",this.props.following)
                }
                {!this.props.following ? (
                    <button
                        onClick={this.followClick}
                        className="btn btn-success btn-raised mr-5"
                    >
                        Follow
                    </button>
                ) : (
                    <button
                        onClick={this.unfollowClick}
                        className="btn btn-warning btn-raised"
                    >
                        UnFollow
                    </button>
                )}
            </div>
        );
    }
}

export default FollowUnfollowButton;
