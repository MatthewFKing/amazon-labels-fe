import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ro">Removal Order Report</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/amzlabels">Amazon Labels</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/neebreport">Newegg Ebay Report</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ca">Newegg Canada Report</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
