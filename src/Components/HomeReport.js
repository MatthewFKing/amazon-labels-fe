import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'

class HomeReport extends Component {

  render() {

    return (
      <div className="container">
        <div className='card'>
          <h5 className='card-header'>Inventory</h5>
          <div className='card-body'>
            <p className='card-text'>Orders Picked: 78</p>
            <p className='card-text'>POs Received: 78</p>
          </div>
        </div>
        <div className='card'>
          <h5 className='card-header'>FBA</h5>
          <div className='card-body'>
            <p className='card-text'>Units Shipped: 125</p>
            <p className='card-text'>Parts Shipped: 243</p>
          </div>
        </div>
        <div className='card'>
          <h5 className='card-header'>Shipping</h5>
          <div className='card-body'>
            <p className='card-text'>Orders Shipped: 35</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeReport;