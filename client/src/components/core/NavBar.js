import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //when link is active then it change the color of active link
  isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "red" };
    else return { color: "white" };
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        {console.log("hello", history)}
        <nav className="navbar navbar-expand-lg navbar-dark font-weight-bold indigo fixed-top">
          <Link className="navbar-brand" to="#">
            BeConnect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={this.isActive(history, "/")}
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={this.isActive(history, "/users")}
                  to="/users"
                >
                  Pepole
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={this.isActive(history, "/contact")}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <span className="navbar-text white-text">
              <ul className="navbar-nav mr-auto">
                {!isAuthenticated() ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        style={this.isActive(history, "/signup")}
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        style={this.isActive(history, "/signin")}
                        to="/signin"
                      >
                        Signin
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        style={this.isActive(history, `/user/${isAuthenticated().user._id}`)}
                        to={`/user/${isAuthenticated().user._id}`}
                      >
                        Hi, {isAuthenticated().user.name}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        style={this.isActive(history, "/signin")}
                        onClick={() => signout(() => history.push("/"))}
                      >
                        Signout
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
