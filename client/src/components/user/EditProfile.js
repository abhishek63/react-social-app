import React, { Component } from "react";
import { viewUser } from "./apiUser";
import { isAuthenticated } from "../auth";

export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
        
    };
  }

  componentDidMount(){
    //fetch user details
    let userId = this.props.match.params.userId;
    let token = isAuthenticated().token;
    console.log("ddddd",userId,token)
    viewUser(userId,token)
    .then(data=>{
      console.log(data);
    })
  }

  render() {
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
                    First name
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="text" value="Mark" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Last name
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="text" value="Jhonsan" />
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
                      value="mark@example.com"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Change profile
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="file" />
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
