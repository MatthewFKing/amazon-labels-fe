import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import "./App.css";

class QALog extends Component {
  state = {
    searchValue: "",
    foundEntries: [],
    searchType: "serial",

  }

  url = "http://10.0.0.234:3030/qa";

  getit = (e) => {
    e.preventDefault();
    let data = { query: this.state.searchValue, type: this.state.searchType };
    axios.post(`${this.url}/qasearch`,  data )
      .then(response => {
        this.setState({ foundEntries: response.data })
      })
      .catch(error => {
        console.log(error);
      });
  }

  search = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  setSearchType = (e) => {
    this.setState({ searchType: e.target.value })
  }

  archiveLog = () => {
    axios.get(`${this.url}/archive`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }


  render() {

    const { foundEntries } = this.state;

    return (
      <div className="container graphs">
      {/* <button type="button" className="btn btn-primary btn-sm" onClick={this.archiveLog}>Archive Log</button> */}
      <br/>
        <form className='form-inline' onSubmit={this.getit}>
          <select onChange={this.setSearchType} className="custom-select" id="inputGroupSelect02">
            <option value='serial'>SN</option>
            <option value='invoice_number'>Invoice #</option>
            <option value="order_id">Order #</option>
            <option value="tracking_number">Tracking #</option>
          </select>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            value={this.state.searchValue}
            onChange={this.search} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <br />
        <table className="table table-hover table-striped table-bordered table-sm">
          <thead className="thead-dark">
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

            {foundEntries.map((entry, i) => (
              <tr key={i}>
                <th scope="row">{moment(entry.date).format('L')}</th>
                <td>{entry.order_id}</td>
                <td>{entry.invoice_number}</td>
                <td>{entry.serial}</td>
                <td>{entry.model}</td>
                <td>{entry.sku}</td>
                <td>{entry.shipping_method}</td>
                <td>{entry.tech_number}</td>
                <td>{entry.tracking_number}</td>
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