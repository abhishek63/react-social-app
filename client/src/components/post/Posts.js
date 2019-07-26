import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../images/avatar.png";
import { showPosts } from "./apiPost";

export class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    //find all the users
    showPosts().then(data => {
      if (data.error) {
      } else {
        console.log(data);
        this.setState({
          posts: data
        });
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.posts.map((post, i) => (
            <div className="col-md-4" key={i}>
              <div className="card testimonial-card m-2 p-2">
                <div class="avatar mx-auto white">
                  <img
                    style={{ height: "100px", width: "auto" }}
                    src={DefaultImage}
                    className="rounded-circle"
                    alt={post.title}
                  />
                </div>

                {/* <!-- Content --> */}
                <div class="card-body text-center">
                  {/* <!-- Name --> */}
                  <h4 class="card-title text-uppercase">{post.title}</h4>

                  <hr />
                  {/* <!-- Quotation --> */}
                  <p>
                    <i class="fas fa-envelope" /> {post.title}
                  </p>

                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    View Post
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

export default Posts;
