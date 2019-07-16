import React, { Component } from "react";
import { signup } from "../auth/index";

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  }

  //handling the input field and set the value in the state of component
  handleChange = name => event => {
    this.setState({
      error :"",
      [name]: event.target.value
    });
  };

  // when user press the submit button
  onSubmit = event => {
    //prevent the default behaviour of event
    event.preventDefault();

    //extracting the value from state
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    //now call the backend api
    signup(user)
      .then(data => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            name: "",
            email: "",
            password: "",
            error: ""
          });
      })
      .catch();
  };

  render() {
    return (
      <div className="container mt-5 mb-5">
        <h1>Registration</h1>
        {/* displaying error message */}
        <div className={this.state.error ? "alert alert-danger" : "none"}>
          {this.state.error}
        </div>
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("name")}
              value={this.state.name}
            />
          </div>
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
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;