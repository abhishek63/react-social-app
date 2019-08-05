import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultPost from "../images/postimage.jpeg";
import { showPosts } from "./apiPost";
import LeftNav from "../core/LeftNav";

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
        <div class="row">
          <div className="col-sm-3">
            <LeftNav />
          </div>
          <div className="col-sm-6">
            <div class="row">
              {this.state.posts.map((post, i) => (
                <>
                  <div className="col-sm-12" key={i}>
                    <div class="card m-2">
                      <div class="card-header">
                        <div>
                          <Link to={`/user/`}>
                            <img
                              style={{
                                borderRadius: "50%",
                                border: "1px solid black"
                              }}
                              className="float-left mr-2"
                              height="30px"
                              width="30px"
                              onError={i =>
                                (i.target.src = `${DefaultPost}`)
                              }
                              src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                              alt=""
                            />
                            <div>
                              <p className="lead">{post.postedBy.name}</p>
                            </div>
                          </Link>
                        </div>
                        <p style={{ fontSize: "14px" }}>{post.title}</p>
                      </div>
                      <div class="card-body p-0">
                        <div class="view overlay">
                          <img
                            class="card-img-top"
                            src={DefaultPost}
                            alt=""
                          />
                          <Link to={`post/${post._id}`}>
                            <div class="mask rgba-white-slight" />
                          </Link>
                          <div className="mx-2">
                            <div class="social-meta">
                              <p class="blue-text">
                                #awesome #bboy #battle #breaking #cool
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <div className="row">
                          <div className="col">
                            <span>
                              <i class="far fa-heart" />
                              265 likes
                            </span>
                          </div>
                          <div className="col">
                            <p>
                              <i class="fas fa-comment " />
                              89 comments
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="col-sm-3" />
        </div>
      </div>
    );
  }
}

export default Posts;
