import React, { useState, Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    fetch("http://localhost:5000/login-user", {
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
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem('isLoggedIn', true);
          window.localStorage.setItem('username', username);
          window.location.href = "./dashboard";
        }
      });
  }

    render() {
      return (
        <div className="row" class="col d-flex justify-content-center">
          <div className="col-lg-6 pb-1">
            <div class="card">
              <div class="card-body">
                <form className="submit-form" onSubmit={this.handleSubmit}>
                  <div>
                    <div className="form-group">
                      <label htmlFor="user">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => this.setState({ username: e.target.value })}
                        id="name"
                        required
                        // value={user.name}
                        // onChange={handleInputChange}
                        name="name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="id">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        id="id"
                        required
                        // value={user.id}
                        // onChange={handleInputChange}
                        name="id"
                      />
                    </div>

                    <br></br>

                    {/* <button onClick={login} className="btn btn-success"> */}
                    <button className="btn btn-success">
                      Login
                    </button>
                    <br></br>
                    Don't have an account?
                    <br></br>
                    <a href="../register"> Register </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

