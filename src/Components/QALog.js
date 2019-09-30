import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import "./App.css";

class QALog extends Component {
  state = {
    searchValue: "",
    testEntry: [
      {
        "_id": "5d9272d9b8c22d63f0f3df96",
        "date": "2019-09-03T04:00:00.000Z",
        "fbStatus": "NF",
        "orderID": "113-1502415-6051441",
        "invoiceNumber": "90298",
        "serial": "5CD92057S2",
        "model": "HP Spectre X360-15T",
        "sku": "LT-HP-0727-CUK-001-S",
        "shippingMethod": "GRD",
        "mustShip": "FALSE",
        "techNumber": "869300NU",
        "qa": {
          "blemishSpec": "NU",
          "finalQA": "NU",
          "checkedAt": "NU",
          "checkedInBy": "DH"
        },
        "trackingNumber": "1Z5E5W924290704830",
        "pointsValue": "0",
        "timeCheckedIn": "12:51:28 PM",
        "notes": "",
        "isThisMonth": true,
        "__v": 0
      },
      {
        "_id": "5d9272d9b8c22d63f0f3df99",
        "date": "2019-09-03T04:00:00.000Z",
        "fbStatus": "MD",
        "orderID": "112-3077141-4754645",
        "invoiceNumber": "90483",
        "serial": "C00012221",
        "model": "DT-CU-0051-CUK-050",
        "sku": "DT-CU-0051-CUK-050",
        "shippingMethod": "GRD",
        "mustShip": "FALSE",
        "techNumber": "13341839",
        "qa": {
          "blemishSpec": "MD",
          "finalQA": "DH",
          "checkedAt": "QA",
          "checkedInBy": "DH"
        },
        "trackingNumber": "1Z5E5W924249146539",
        "pointsValue": "12",
        "timeCheckedIn": "12:58:48 PM",
        "notes": "",
        "isThisMonth": true,
        "__v": 0
      }],

  }

  url = "http://10.0.0.234:3030";

  getit = () => {
    let data = this.state.searchValue;
    axios.post(`${this.url}/qasearch`, {data})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  search = (e) => {
    this.setState({ searchValue: e.target.value })
  }


  render() {

    const { testEntry } = this.state;

    return (
      <div className="container graphs">
        
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            value={this.state.searchValue}
            onChange={this.search} />
          <button onClick={this.getit} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>


        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Order ID</th>
              <th scope="col">Invoice #</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Model</th>
              <th scope="col">SKU</th>
              <th scope="col">Ship Method</th>
              <th scope="col">Tech Number</th>
              <th scope="col">Tracking Number</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>

            {testEntry.map((entry, i) => (
              <tr key={i}>
                <th scope="row">{moment(testEntry.date).format('L')}</th>
                <td>{entry.orderID}</td>
                <td>{entry.invoiceNumber}</td>
                <td>{entry.serial}</td>
                <td>{entry.model}</td>
                <td>{entry.sku}</td>
                <td>{entry.shippingMethod}</td>
                <td>{entry.techNumber}</td>
                <td>{entry.trackingNumber}</td>
                <td>{entry.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default QALog;