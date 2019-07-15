import React, { Component } from "react";

export class Signup extends Component {
  render() {
    return (
      <div className="container m-5">
        <form>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input type="password" className="form-control" />
            </div>
            <a class="btn btn-primary">Register</a>
        </form>
      </div>
    );
  }
}

export default Signup;
