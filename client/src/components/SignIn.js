import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles/signin.css';



class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: '',
      redirect: false

    }
  }

  onSubmit = async e => {

    e.preventDefault();
    const response = await fetch('/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    });
    console.log(response);
    if (response.status == 401) {
      window.alert("Invalid email or password")
    } else {

      const body = await response.json();
      console.log("body", body)
      this.setState({ user: body });
      this.props.setUser(body);


    }

    this.setState({ email: '', password: '' });




  };


  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div id="signIn" className="container col-md-4">
        <form className="signInForm" onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="col-sm-10" id="field">
              <input name="email"
                className="sign-in-field"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="password"
                className="sign-in-field"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
              />
              <button type="submit" className="btn btn-info text-center">Sign In</button>

            </div>
          </div>
        </form>
      </div>
    )
  }
}


export default SignInForm;