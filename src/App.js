import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./componenets/Home";
import Registration from "./componenets/Registration";
import Login from "./componenets/Login";
import Profile from "./componenets/Profile";
import Auth_Service from "./services/Auth_Service";
import AdminBoard from "./componenets/Admin_Board";
import LibrarianBoard from "./componenets/Librarian_Board";
import UserBoard from "./componenets/User_Board";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
  

    this.state = {
      showLibrarianBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const user = Auth_Service.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showLibrarianBoard: user.roles.includes("ROLE_LIBRARIAN"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    Auth_Service.logout();
  }



  render() {
    const { currentUser, showLibrarianBoard, showAdminBoard } = this.state;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark ">
            <Link to={"/"} className="navbar-brand">
              WILEY ONLINE LIBRARY
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              
            {showLibrarianBoard && (
              <li className="nav-item">
                <Link to={"/librarian"} className="nav-link">
                  Librarian_Board Board
                </Link>
              </li>
            )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : ( 
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
           
          
            )}
          </nav>

          {/* <div className="container mt-3"> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/admin" component={AdminBoard} />
              <Route path="/librarian" component={LibrarianBoard} />
              <Route path="/user" component={UserBoard} />
            </Switch>
          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
