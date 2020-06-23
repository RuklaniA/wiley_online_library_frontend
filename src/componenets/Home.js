import React, { Component } from "react";
import User_Service from "../services/User_Service";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    User_Service.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="home-layout">
      {/* <div className="container"> 
        <header className="jumbotron">  */}
      
        {/* </header> 
     </div>  */}


    

      </div>
    );
  }
}

export default Home;
