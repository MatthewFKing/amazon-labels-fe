import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import "./App.css";

class Backorders extends Component {
  state = {
    error: "",
    ebOrders: [],
    clearedEBOrders: [],
    ebReport: [],
    lastOrders: [],
    toggleDeleteIDs: false,
    ordersToDelete: [],
  };

  url = "http://10.0.0.234:3060";

  componentDidMount() {
    let url = `${this.url}/nenum`;
    
  }

  onUpload = e => {
    e.preventDefault();
    let data = null;
    let url = `${this.url}/neebreport`;
    
  };


  render() {
  
    return (
      <div className="container neeb">

        <div className="instructions">
          <button
            className="btn btn-light"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Instructions
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">

            </div>
          </div>
        </div>
        <div className="neeb-form">
          <h3 className="card-header">Backorder Report</h3>

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <h4>Fishbowl Report</h4>
              <input
                className="form-control"
                ref={ref => {
                  this.uploadFB = ref;
                }}
                type="file"
              />
              <div className='ne-header'>
                <h4>Amazon Unshipped Report</h4>
              </div>
              <input
                className="form-control"
                ref={ref => {
                  this.uploadAMZ = ref;
                }}
                type="file"
              />
            </div>

            <button className="btn btn-primary">Upload</button>


          </form>
        </div>

      </div>
    );
  }
}

export default Backorders;

    //if ebay only upload report and cleared orders
    //if newegg only upload formdata only
    //if both first request cleared orders and then send everything as form data
