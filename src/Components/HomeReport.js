import React, { Component } from "react";
import "./App.css";

class HomeReport extends Component {
  state = {
    ordersPicked: [],
    posReceived: [],
    fbaShipped: [],
    ordersShipped: [],
    update: false,
  }

  update = () => {
    this.setState({ update: !this.state.update });
  }

  onUploadPicking = (e) => {
    e.preventDefault();
    
  }

  render() {
    const updateForm = (
      <div className="form-group">
        <h4>Picking Report</h4>
        <input
          className="form-control"
          ref={ref => {
            this.pickingReport = ref;
          }}
          type="file"
          onChange={this.onUploadPicking}
        />
      </div>
    );

    return (
      <div className="container">
        <button className='btn' onClick={this.update}>Update</button>
        {this.state.update ? updateForm : null}
        <div className="card">
          <h5 className="card-header">Inventory</h5>
          <div className="card-body">
            <p className="card-text">Orders Picked: 78</p>
            <p className="card-text">POs Received: 78</p>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header">FBA</h5>
          <div className="card-body">
            <p className="card-text">Units Shipped: 125</p>
            <p className="card-text">Parts Shipped: 243</p>
          </div>
        </div>
        <div className="card">
          <h5 className="card-header">Shipping</h5>
          <div className="card-body">
            <p className="card-text">Orders Shipped: 35</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeReport;
