import React, { Component } from "react";
import "./home.css";

// Landing page
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  // HTML for landing/welcome page
  render() {
    return (
      <div >
        <title> CarryOn </title>
        <body >
          <header id="showcase">
            <div >
              <div class="brief">
                <h1> Welcome to CarryOn</h1>
                <p> CarryOn is an all-in-one travel planner designed to make all of your adventures come to life.
                </p>
              </div>
            </div>
          </header>

          <section id="section-c">
            <div className="box-1">
              <h4> Ready to get started? </h4>

              <a href="/register" class="button"> Register </a>
            </div>
            <div className="box-2">
              <h4>Already have an account? </h4>
              <a href="/login" class="button"> Login </a>
            </div>
          </section>
        </body>
      </div>
    );
  }
}

