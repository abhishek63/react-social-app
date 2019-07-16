import React, { Component } from "react";

export class Contact extends Component {
  render() {
    return (
      <div>
        <div class="container">
          <br />
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Abhishek Kumar</h4>
              <span class="card-text">
                <ul>
                  <li>
                    Developed User Interface (UI) applications and professional
                    web applications using HTML,CSS, JavaScript,, Angular,
                    JQuery, Node JS, React JS, Express JS, Bootstrap, JSP, Mongo
                    DB, NPM, GIT, MVC, JSON
                  </li>
                  <li>
                    Experience in building MEAN applications using MongoDB,
                    Express.JS, Angular, Node-JS, creating Web services
                    components of Restful Web services to interact with UI
                    Interfaces using REST API with Node-JS, Express-JS
                  </li>
                </ul>
              </span>
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
        </div>
      </div>
    );
  }
}

export default Contact;
