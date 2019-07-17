import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  //handling the input field and set the value in the state of component
  handleChange = name => event => {
    this.setState({
      error: "",
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
            error: "",
            open: true
          });
      })
      .catch();
  };

  render() {
    return (
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div class="text-center mt-4">
                <h1 class="h2">Registration</h1>
                <p class="lead">
                  <div
                    className={this.state.error ? "alert alert-danger" : "none"}
                  >
                    {this.state.error}
                  </div>
                  {/* displaying sign success message */}
                  <div
                    className="alert alert-success"
                    style={{ display: this.state.open ? "" : "none" }}
                  >
                    Account is successfully created please{" "}
                    <Link to="/signin" className="alert-link">
                      signin
                    </Link>
                  </div>
                </p>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="m-sm-4">
                    <form>
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          class="form-control form-control-lg"
                          type="text"
                          placeholder="Enter your name"
                          onChange={this.handleChange("name")}
                          value={this.state.name}
                        />
                      </div>

                      <div class="form-group">
                        <label>Email</label>
                        <input
                          class="form-control form-control-lg"
                          type="email"
                          placeholder="Enter your email"
                          onChange={this.handleChange("email")}
                          value={this.state.email}
                        />
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input
                          class="form-control form-control-lg"
                          type="password"
                          placeholder="Enter password"
                          onChange={this.handleChange("password")}
                          value={this.state.password}
                        />
                      </div>
                      <div class="text-center mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={this.onSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
