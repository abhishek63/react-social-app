import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

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

  //signout

  signout = next => {
    localStorage.removeItem("token");
    next();
    return fetch("http://localhost:5000/api/signout", {
      method: "GET"
    })
      .then(response => {
        console.log(response, "response");
        return response.json();
      })
      .catch(err => console.log(err));
  };

  isAuthenticated = () => {
    if (localStorage.getItem("token"))
      return JSON.parse(localStorage.getItem("token"));
    else return false;
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        {console.log("hello", history)}
        <nav className="navbar navbar-expand-lg navbar-dark font-weight-bold indigo">
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
                  style={this.isActive(history, "/contact")}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={this.isActive(history, "/about")}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <span className="navbar-text white-text">
              <ul className="navbar-nav mr-auto">
                {!this.isAuthenticated() ? (
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
                        style={this.isActive(history, "/profile")}
                        to="/signin"
                      >
                        Hi,{this.isAuthenticated().user.name}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        style={this.isActive(history, "/signin")}
                        onClick={() => this.signout(() => history.push("/"))}
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