import React, { Component } from "react";
import "../App.css";

class Sidebar extends Component {
  state = {
    ordersPicked: [],
    posReceived: [],
    fbaShipped: [],
    ordersShipped: [],
    update: false,
  }

  render() {
    return (

      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <a href="#fbaSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">FBA</a>
            <ul className="collapse list-unstyled" id="fbaSubmenu">
              <li>
                <a href="#">Amazon Labels</a>
              </li>
              <li>
                <a href="#">FNSKU Labels</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#invSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Inventory</a>
            <ul className="collapse list-unstyled" id="invSubmenu">
              <li>
                <a href="#">Amazon Labels</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#soSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Sales Orders</a>
            <ul className="collapse list-unstyled" id="soSubmenu">
              <li>
                <a href="#">Newegg Report</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
