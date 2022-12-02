import React, { Component } from "react";

// register page
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // client-side for registering a user
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        window.location.href = "./login";
      });
    console.log(username);
  }

  // HTML for registration page
  render() {
    return (
      <div className="row" class="col d-flex justify-content-center">
        <div className="col-lg-6 pb-1">
          <div className="card">
            <div className="card-body">
              <form className="submit-form" onSubmit={this.handleSubmit}>
                <div>
                  <div className="form-group">
                    <h4 style={{ color: "#198754" }}> <strong>Register your Account </strong></h4>
                    <label htmlFor="user">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      onChange={(e) => this.setState({ username: e.target.value })}
                      name="name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="id">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="id"
                      required
                      onChange={(e) => this.setState({ password: e.target.value })}
                      name="id"
                    />
                  </div>

                  <br></br>
                  <button className="btn btn-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

