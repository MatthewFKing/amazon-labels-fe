import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class NeweggCA extends Component {
  state = {
    orderIDs: [],
    neReport: [],
  };

  url = "http://localhost:3030/ca";

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
      console.log(response);
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
            </div>
          </li>
        ))}
        <button className="btn btn-primary" onClick={this.generate}></button>
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
              Instructions for Use:
              <br />
              1. Download the Sales Report from Ebay and Newegg.
              <br />
              2. Drag the downloaded Ebay report to the Ebay Upload section.
              <br />
              3. Select the cleared Ebay Orders from the pop-up
              <br />
              4. Drag the downloaded Newegg Report to the Newegg upload section{" "}
              <br />
              5. Click "Submit" and the Fishbowl Sales Orders Report will be
              downloaded <br />
              6. Open Fishbowl and click File -> Import -> Sales Orders and
              select the downloaded file
              <br />
              7. Verify that the correct orders have been uploaded.
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