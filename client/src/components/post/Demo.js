import React, { Component } from "react";

export class Demo extends Component {
  render() {
    return (
      <div>
        <div class="page">
          <div class="page-content">
            <div class="row">
              <div class="col-md-2">
                <div class="blue">test</div>
              </div>
              <div class="col-md-10">
                <div class="green">test</div>
              </div>
            </div>
          </div>
          <div class="sidebar">
            <div class="gold">test</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
