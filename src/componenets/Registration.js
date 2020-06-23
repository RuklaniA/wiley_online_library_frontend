import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Auth_Service from "../services/Auth_Service";


class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword:"",
      successful: false,
      message: "",
      processing:false
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
  }
resetForm=()=>{
  this.setState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword:"",
    successful: false,
    message: "",
    processing:false
  })
}
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e){ 
   
    this.setState({confirmPassword: e.target.value})

    
  }
 
  handleOnSubmit(e) {
    e.preventDefault();
     
   
    this.setState({
      message: "",
      successful: true,
      processing:true
    });

 this.form.validateAll();
 if (this.checkBtn.context._errors.length === 0) {
    Auth_Service.register(
        this.state.firstName,
        this.state.lastName,
        this.state.username,
        this.state.email,
        this.state.password,
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
            processing:false
          });        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            processing:false
          });
        }
      );
    
    }
  }


  render() {
    return (
      <div className="col-md-24">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleOnSubmit}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        validations={[required, validate_firstName]}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeLastName}
                        validations={[required, validate_lastName]}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                    <div className="col">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, validate_username]}
                      />
                  </div>
                  </div>
                 <div className="col">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, validate_email]}
                      />
                    </div>
               </div>
               </div>
                 <div className="row">
                   <div className="col">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, isEqual]}
                      />
                  </div>
                  </div>
                  <div className="col">
                  <div className="form-group">
                      <label htmlFor="confirmPassword"> Confirm Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                        validations={[required,isEqual]}
                       
                      />
                      {/* {this.passwordMatch()} */}
                  </div>
               
                </div>
</div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block"  disabled={this.state.loading}>
                  {this.state.processing && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign Up</span>
                    </button>
                </div>
              </div>
            )}

    {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )} 
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
   }
}

/**
 *
 *---------------- Validations----------------
 *
 */

// const validate_confirmPassword = (password,value) => {
  
//   if (value !== password) {
//     return(
//           <div className="alert alert-danger" role="alert">
//              Password is not matching
//            </div>
//     )
//   }
// }


const validate_firstName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The first name must be between 3 and 20 characters.
      </div>
    );
  }
};

const validate_lastName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be between 3 and 20 characters.
      </div>
    );
  }
};

const validate_email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validate_username = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};



const isEqual = (value, props, state) => {
  const bothUsed = state.password[0].isUsed && state.confirmPassword[0].isUsed;
  const bothChanged = state.password[0].isChanged && state.confirmPassword[0].isChanged;

  if (bothChanged && bothUsed && state.password[0].value !== state.confirmPassword[0].value) {
    return <div className="alert alert-danger">Passwords are not matching</div>;
  }
};



const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


export default Registration;
