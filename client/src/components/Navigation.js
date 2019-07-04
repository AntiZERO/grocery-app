import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignOut from './SignOut';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './styles/navigation.css';


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  setUser(currentUser) {
    let user = currentUser;
    this.setState({ user: user })
  }


  render() {

    return (
      <nav className="navbar navbar-expand-md fixed-top scrolling-navbar">
        <div className="container">
          <div className="home-btn">
            <Link className="link" to="/"><span className="navbar-brand">Grocery List</span></Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">+</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {(this.state.user) ?
                <div>
                  <li id="list-link"className="nav-item-listLInk">
                    <Link className="link" id="nav-lists-link" to='/Lists'> My Lists</Link>
                  </li>
                  <li className="nav-item-signOut">
                    <SignOut setUser={this.setUser.bind(this)} />
                  </li>
                </div>
                :
                <div className="signInOut">
                  <li className="nav-item-signUp">
                    <SignUp setUser={this.setUser.bind(this)} />
                  </li>
                  <li className="nav-item-signIn">
                    <SignIn setUser={this.setUser.bind(this)} />
                  </li>
                </div>
              }
            </ul>
          </div>

        </div>
      </nav>

    )
  }
}


export default Navigation;