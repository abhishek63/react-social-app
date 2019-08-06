import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultPost from "../images/postimage.jpeg";
import { singlePost } from "./apiPost";

export class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      post:""
    };
  }
  componentDidMount() {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data
        });
      }
    });
  }
  render() {
    const { post } = this.state;
    //let postt = JSON.parse(post);
    return (
      <div class="container">
        <div class="row">
          <div className="col-sm-12">
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
                      onError={i => (i.target.src = `${DefaultPost}`)}
                      src={`${process.env.REACT_APP_API_URL}/post/photo/${
                        post._id
                      }`}
                      alt=""
                    />
                    <div>
                        {console.log(post.postedBy)}
                      <p className="lead">{this.state.post.postedBy.name}</p>
                    </div>
                  </Link>
                </div>
                <p style={{ fontSize: "14px" }}>{post.title}</p>
              </div>
              <div class="card-body p-0">
                <div class="view overlay">
                  <img class="card-img-top" src={DefaultPost} alt="" />
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
        </div>
      </div>
    );
  }
}

export default SinglePost;
