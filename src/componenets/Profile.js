import React, { Component } from "react";
import Auth_Service from "../services/Auth_Service";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: Auth_Service.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id: </strong> {currentUser.id}
        </p>
        <p>
          <strong>First Name:</strong> {currentUser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {currentUser.lastName}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.password}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}

export default Profile;
