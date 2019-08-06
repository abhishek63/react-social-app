import React, { Component } from "react";

export class LeftNav extends Component {
  render() {
    return (
      <div className="">
        <div class="panel panel-default">
                <div class="panel-heading">
                </div>
                <ul className="list-unstyled">
              <li>
                <a href="https://twitter.com/kumargolu63">
                  <i class="fab fa-twitter"> Twitter</i>
                </a>
              </li>
              <li>
                <a href="http://facebook.com/kumargolu63">
                  <i class="fab fa-facebook"> FaceBook</i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/abhishekhit/">
                  <i class="fab fa-linkedin"> Linkedin</i>
                </a>
              </li>
              <li class="last-item">
                <a href="https://github.com/abhishek63">
                <i class="fab fa-github"> Github</i>
                </a>
              </li>
              </ul>
            
            </div>
      </div>
    );
  }
}

export default LeftNav;
