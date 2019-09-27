import React, { Component } from "react";
import "./App.css";
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  state = {
  }

  render() {
    return (

      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <a href="#fbaSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">FBA</a>
            <ul className="collapse list-unstyled" id="fbaSubmenu">
              <li>
              <NavLink className="nav-link" to="/ro">Removal Order Report</NavLink>
              </li>
              <li>
              <NavLink className="nav-link" to="/amzlabels">Amazon Labels</NavLink>
              </li>
              <li>
              <NavLink className="nav-link" to="/fnsku">FNSKU Labels</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a href="#invSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Inventory</a>
            <ul className="collapse list-unstyled" id="invSubmenu">
              <li>
                <NavLink className="nav-link" to="/qa">Production Reports</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/qalog">QA Log</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a href="#soSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Sales Orders</a>
            <ul className="collapse list-unstyled" id="soSubmenu">
              <li>
              <NavLink className="nav-link" to="/neebreport">Newegg Ebay Report</NavLink>
              </li>
              <li>
              <NavLink className="nav-link" to="/ca">Newegg Canada Report</NavLink>
              </li>
              <li>
              <NavLink className="nav-link" to="/amzca">Amazon Canada Report</NavLink>
              </li>
              <li>
              <NavLink className="nav-link" to="/web">Web Orders</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
