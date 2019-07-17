import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "../auth/index";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToHomePage: false
    };
  }

  //handling the input field and set the value in the state of component
  handleChange = name => event => {
    this.setState({
      error: "",
      [name]: event.target.value
    });
  };

  //authenticate
  authenticate = (jwt, next) => {
    //save token in the browser local storage
    localStorage.setItem("token", JSON.stringify(jwt));
    next();
  };

  // when user press the submit button
  onSubmit = event => {
    //prevent the default behaviour of event
    event.preventDefault();

    //extracting the value from state
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    //now call the backend api
    signin(user)
      .then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          //authenticate
          this.authenticate(data, () => {
            this.setState({
              redirectToHomePage: true
            });
          });
        }
        this.setState({
          email: "",
          password: "",
          error: ""
        });
      })
  };

  render() {
    if (this.state.redirectToHomePage) return <Redirect to="/" />;

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-4" />
          <div className="col-sm-4 card p-4">
            {" "}
            <h1>Sign In</h1>
            {/* displaying error message */}
            <div className={this.state.error ? "alert alert-danger" : "none"}>
              {this.state.error}
            </div>
            <form>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange("email")}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={this.handleChange("password")}
                  value={this.state.password}
                />
              </div>
              <button className="btn btn-primary" onClick={this.onSubmit}>
                Sign In
              </button>
            </form>
          </div>
          <div className="col-sm-4" />
        </div>
      </div>
    );
  }
}

export default Signin;
