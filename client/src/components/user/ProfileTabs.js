import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

export class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;
    return (
      <div className="row">
        <div className="col-sm-4">
          <h3 className="">Following</h3>
          <hr />
          {following.map((person, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${person._id}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    src={`${process.env.REACT_APP_API_URL}/api/user/photo/${
                      person._id
                    }`}
                    alt={person.name}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="col-sm-4">
          <h3 className="">Followers</h3>
          <hr />
          {followers.map((person, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${person._id}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    src={`${process.env.REACT_APP_API_URL}/api/user/photo/${
                      person._id
                    }`}
                    alt={person.name}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="col-sm-4" />
      </div>
    );
  }
}

export default ProfileTabs;
