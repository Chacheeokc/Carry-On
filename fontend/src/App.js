import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Destinations from "./components/destinations";
import Register from "./components/register";

// using bootstrap components
// ex. navbar-dark is different bootstrap classes
//"navbar-brand" indicates that it's the brand part of the nav bar
// similarly, navbar-nav indicates the navigation part of the nav bar
// Clicking restaurants will take you to restaurants page

//*** is using useState non-restful? */
function App() {

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/logout-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          window.localStorage.removeItem("isLoggedIn");
          window.localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          <h1> Carry On </h1>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" >
            {window.localStorage.getItem('isLoggedIn') ? (
              <a className="nav-link" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
                Logout
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}

          </li>

          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/destinations"} className="nav-link">
              Destinations
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              // removed login={login} from below
              <Login {...props} />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              // removed user={user} from below
              <Dashboard {...props} />
            )}
          />
          <Route
            path="/destinations"
            render={(props) => (
              // removed user={user} from below
              <Destinations {...props} />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              // removed user={user} from below
              <Register {...props} />
            )}
          />

        </Switch>
      </div>

    </div>
  );
}

export default App;
