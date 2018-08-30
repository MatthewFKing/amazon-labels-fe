import React, { Component } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import "./App.css";

class NeweggCA extends Component {
  state = {
    orderIDs: [],
    neReport: [],
  };

  url = "http://10.0.0.234:3030/ca";

  onUpload = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("file", this.NeweggReport.files[0]);

    axios
      .post(this.url, data)
      .then(response => {
        let orderIDs = response.data.orderIDs.map(id => {
          return { id, amount: 0 }
        });
        this.setState({ orderIDs, neReport: response.data.neReport });
      })
      .catch(error => {
        console.log(error);
      });
  };

  generate = () => {
    let url = `${this.url}/gen`;
    let data = { 
      eWasteFees: this.state.orderIDs,
      neReport: this.state.neReport
    };

    axios.post(url, data)
    .then(response => {
      const fbReport = new Blob([response.data.fbReport], {
        type: "text/csv"
      });
      fileDownload(fbReport, `NE EB Report.csv`);
    })
    .catch(error => {
      console.log(error);
    });

  }

  setEWaste = (index, e) => {
    const orderIDs = this.state.orderIDs;
    orderIDs[index].amount = e.target.value;
    this.setState({ orderIDs })
  }

  removeOrder = (idIndex, e) => {
    const orderIDs = this.state.orderIDs;
    const neReport = this.state.neReport;
    const reportIndex = neReport.findIndex(line => line['Order Number'] === orderIDs[idIndex].id);
    neReport.splice(reportIndex, 1);
    orderIDs.splice(idIndex, 1);
    this.setState({ orderIDs, neReport });
  }

  render() {

    const orderIDList = (
      <div className="card eb-clear">
        <h5 className="card-header">Enter E-Waste Fees</h5>
        {this.state.orderIDs.map((ID, index) => (
          <li
            className="list-group-item"
            key={index}>
            <div className="e-waste-list">
              <p className="mb-1">{ID.id}</p>
              <div className="input-group mb-1">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" className="form-control" aria-label="Amount" value={ID.amount} onChange={(e) => this.setEWaste(index, e)}></input>
              </div>
              <button className='btn btn-danger' onClick={(e) => this.removeOrder(index, e)}>X</button>
            </div>
          </li>
        ))}
        <button className="btn" onClick={this.generate}>Submit</button>
      </div>
    );

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
              <h4>Instructions for Use:</h4>
              <p>1. Download the Sales Report from Newegg Canada (make sure that the advanced search is set to <mark>"Order Status: Unshipped"</mark>).
              <a className="" rel="noopener noreferrer" href="https://sellerportal.newegg.com/can/manage-order/orderlist" target="_blank"> Link</a></p>
              <p>2. Drag the downloaded Newegg Report to the file upload section.</p>
              <p>3. Click "Upload" and enter the GST Fees for each order.</p>
              <p>4. Click "Submit" at the bottom of this list and the Fishbowl Sales Orders Report will be
              downloaded.</p>
              <p>5. Open Fishbowl and click File -> Import -> Sales Orders and
              select the downloaded file.</p>
              <p>6. Verify that the correct orders have been uploaded.</p>
            </div>
          </div>
        </div>
        <div className="neeb-form">
          <h3 className="card-header">Newegg Canada Order Report</h3>

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <h4> Newegg Canada Report </h4>
              <input
                className="form-control"
                ref={ref => {
                  this.NeweggReport = ref;
                }}
                type="file"
                onChange={this.onUpload}
              />
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>
        </div>
        {this.state.orderIDs.length > 0 ? orderIDList : null}
      </div>
    );
  }
}

export default NeweggCA;