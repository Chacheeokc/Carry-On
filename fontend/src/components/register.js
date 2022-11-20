import React, { useState, Component } from "react";

export default class Register extends Component {
  // old stuff
  // const initialUserState = {
  //     name: "",
  //     id: "",
  //   };

  //   const [user, setUser] = useState(initialUserState);

  //   const handleInputChange = event => {
  //     const { name, value } = event.target;
  //     setUser({ ...user, [name]: value });
  //   };

  //   const login = () => {
  //     props.login(user)
  //     props.history.push('/');
  //   }

  // new stuff
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password} = this.state;
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
      });
      console.log(username);
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
                      id="name"
                      required
                      // value={user.name}
                      onChange={(e) => this.setState({ username: e.target.value })}
                      name="name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="id">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      required
                      // value={user.id}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      name="id"
                    />
                  </div>

                  <br></br>
{/* 
                  <button onClick={login} className="btn btn-success"> */}
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

