import React, { Component } from "react";
import { viewUser, update } from "./apiUser";
import { isAuthenticated } from "../auth";

export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      photo: "",
      error: "",
      fileSize: 0
    };
  }

  componentDidMount() {
    this.formData = new FormData();
    //formData.set()
    //fetch user details
    let userId = this.props.match.params.userId;
    let token = isAuthenticated().token;
    console.log("ddddd", userId, token);
    viewUser(userId, token).then(data => {
      console.log(data);
      this.setState({
        name: data.name,
        email: data.email
      });
    });
  }

  //handling the input field and set the value in the state of component
  handleChange = name => event => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    let fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.formData.set(name, value);
    this.setState({
      error: "",
      [name]: value,
      fileSize
    });
  };

  //handling the submission button
  handleSubmit = event => {
    event.preventDefault();

    let userId = this.props.match.params.userId;
    let token = isAuthenticated().token;

    console.log("hello sirji ", this.formData);

    update(userId, token, this.formData).then(data => {
      console.log("hhhh", data);
    });
  };

  render() {
    const { name, email, photo } = this.state;
    return (
      <div class="container mt-2">
        <div class="row">
          <div class="col-lg-4">
            <div class="card card-cascade wider">
              {/* <!-- Card image --> */}
              <div class="view view-cascade overlay">
                <img
                  class="card-img-top"
                  src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg"
                  alt="Card imagee cap"
                />
                <a href="#!">
                  <div class="mask rgba-white-slight" />
                </a>
              </div>

              {/* <!-- Card content --> */}
              <div class="card-body card-body-cascade text-center">
                {/* <!-- Title --> */}
                <h4 class="card-title">
                  <strong>Alison Belmont</strong>
                </h4>
                {/* <!-- Subtitle --> */}
                <h5 class="blue-text pb-2">
                  <strong>Graffiti Artist</strong>
                </h5>
                {/* <!-- Text --> */}
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card p-5 pt-0">
              <h2 class="mb-3">User Profile</h2>
              <form>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Name
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      onChange={this.handleChange("name")}
                      value={name}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Email
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="email"
                      onChange={this.handleChange("email")}
                      value={email}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Change profile
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="file"
                      accept="image/*"
                      onChange={this.handleChange("photo")}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Website
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="url" value="" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Address
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label" />
                  <div class="col-lg-6">
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="City"
                    />
                  </div>
                  <div class="col-lg-3">
                    <input
                      class="form-control"
                      type="text"
                      value=""
                      placeholder="State"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Username
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      value="jhonsanmark"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Password
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="password"
                      value="11111122333"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Confirm password
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="password"
                      value="11111122333"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label" />
                  <div class="col-lg-9">
                    <input
                      type="reset"
                      class="btn btn-secondary"
                      value="Cancel"
                    />
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Save Changes"
                      onClick={this.handleSubmit}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
