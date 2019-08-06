import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { create } from "./apiPost";

export class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      fileSize: 0,
      error: "",
      user: ""
    };
  }

  componentDidMount() {
    this.formData = new FormData();
    this.setState({
      user : isAuthenticated().user
    })
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

    let userId = this.state.user._id;
    let token = isAuthenticated().token;

    console.log("hello sirji ", this.formData);

    create(userId, token, this.formData).then(data => {
      console.log("hhhh", data);
    });
  };
  render() {
    const { title, body } = this.state;
    return (
      <div className="container">
  
        <div className="row m-2">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="card p-5"
             style={{
              backgroundImage:
                "url('https://apromaenergy.com/wp-content/uploads/2018/09/background-site.jpg')"
            }}
            >
              <h1 className="">Add New Post</h1>
              <br />
              <form>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Name
                  </label>
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      onChange={this.handleChange("title")}
                      value={title}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Content
                  </label>
                  <div class="col-lg-9">
                    <textarea
                      cols="10"
                      rows="10"
                      class="form-control"
                      type="text"
                      onChange={this.handleChange("body")}
                      value={body}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Add Image
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
          <div className="col-sm-2" />
        </div>
      </div>
    );
  }
}

export default NewPost;
