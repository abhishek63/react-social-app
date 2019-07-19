import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../images/avatar.png";
import { showUsers } from "./apiUser";

export class People extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    //find all the users
    showUsers().then(data => {
      if (data.error) {
      } else {
        console.log(data);
        this.setState({
          users: data
        });
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.users.map((user, i) => (
            <div className="col-md-4" key={i}>
              <div className="card testimonial-card m-2 p-2">
                <div class="avatar mx-auto white">
                  <img
                    style={{ height: "200px", width: "auto" }}
                    src={DefaultImage}
                    className="rounded-circle"
                    alt={user.name}
                  />
                </div>

                {/* <!-- Content --> */}
                <div class="card-body text-center">
                  {/* <!-- Name --> */}
                  <h4 class="card-title text-uppercase">{user.name}</h4>

                  <hr />
                  {/* <!-- Quotation --> */}
                  <p>
                    <i class="fas fa-envelope" /> {user.email}
                  </p>

                  <Link
                    to={`/user/${user._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default People;
