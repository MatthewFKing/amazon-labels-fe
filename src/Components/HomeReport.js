import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

class HomeReport extends Component {
  state = {
    ordersPicked: [],
    posReceived: [],
    fbaShipped: [],
    pendingWO: '',
    ordersShipped: [],
    update: false,
  }

  componentDidMount() {
    this.update();
  }
  url = "http://10.0.0.234:3030/reports";

  update = () => {
    axios.get(this.url)
      .then(response => {
        console.log(response);
        this.setState({
          fbaShipped: response.data.shippedQty,
          pendingWO: response.data.unshippedQty
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  onUploadPicking = (e) => {
    e.preventDefault();
    
  };

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
      <div className="container neeb">
        
        {this.state.update ? updateForm : null}
        <div className="card">
          <h5 className="card-header">FBA</h5>
          <div className="card-body">
            <p className="card-text">Units Shipped Yesterday: {this.state.fbaShipped}</p>
            <p className="card-text">Pending Work Orders: {this.state.pendingWO}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeReport;
