import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div class="container mt-2">
        <div class="jumbotron text-center">
          <h2 class="card-title h2">Social Network website using <span className="red p-2">REACT</span></h2>
          <p class="blue-text my-4 font-weight-bold">
            implemented on powerfull bootstrap material UI
          </p>

          <div class="row d-flex justify-content-center">
            <div class="col-xl-7 pb-2">
              <p class="card-text">
                  <h5>Features</h5>
                  <hr/>
                <ul className="list-unstyled">
                    <li>user authentication using JWT</li>
                    <li>express.js for backend restfull api creation</li>
                    <li>powerfull node.js server</li>
                    <li>password encryption</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
