import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import image from '../images/logo.png';

class Nav extends Component {

  render() {

    return (
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <NavLink className="navbar-brand" to="/">
              <img src={image} width="40" height="40" alt=""></img>
            </NavLink>
              <NavLink className="navbar-brand mb-0 h1" to="/">CUK Warehouse<span className="sr-only">(current)</span></NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
