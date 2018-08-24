import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './App.css';

class NeEbReport extends Component {

  state = {
    error: '',
    ebOrders: [],
    clearedEBOrders: [],
    ebReport: [],
  }

  url = "http://10.0.0.234:3030";

  onUpload = e => {
    e.preventDefault();
    let data = null;
    let url = `${this.url}/neebreport`;

    if (this.uploadEB.files[0] && !this.uploadNE.files[0]) {
      url = `${this.url}/ebreport`;
      data = { report: this.state.ebReport, clearedOrders: this.state.clearedEBOrders };
    } else if (!this.uploadEB.files[0] && this.uploadNE.files[0]) {
      data = new FormData();
      data.append('file', this.uploadNE.files[0]);
    } else if (this.uploadEB.files[0] && this.uploadNE.files[0]) {
      data = new FormData();
      data.append('file', this.uploadNE.files[0]);
      data.append('ebReport', this.state.ebReport);
      data.append('clearedOrders', this.state.clearedEBOrders);
    }



    axios.post(url, data)
      .then(response => {
        const fbReport = new Blob(
          [response.data.fbReport],
          { type: 'text/csv' });
        fileDownload(fbReport, `NE EB Report.csv`);
      })
      .catch(error => {
        console.log(error)
      });
  }

  EBFileSelect = (e) => {
    if (this.uploadEB.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result.split("\r\n").map(line => {
          return line.split(/,/).map(text => {
            return text.replace(/"/g, "");
          });
        });

        let orders = data.filter(line => {
          return line[10] === "United States";
        });

        this.setState({ ebReport: orders });

        this.setState({ ebOrders: orders.map(line => line[0]) });
      }
      reader.readAsText(this.uploadEB.files[0]);
    }
  }

  addClearedOrder = (id, e) => {
    console.log(e.target);
    if (this.state.clearedEBOrders.indexOf(id) === -1) {
      let clearedEBOrders = [...this.state.clearedEBOrders, id];
      this.setState({ clearedEBOrders });
    } else {
      let clearedEBOrders = [...this.state.clearedEBOrders];
      var index = clearedEBOrders.indexOf(id);
      clearedEBOrders.splice(index, 1);
      this.setState({ clearedEBOrders });
    }
  }

  render() {

    const ebOrders =
      <div className='card eb-clear'>
        <h5 className='card-header'>Select Cleared Orders</h5>
        {this.state.ebOrders.map((ID, index) =>
          <li className={this.state.clearedEBOrders.indexOf(ID) > -1 ? 'list-group-item active' : 'list-group-item'}
            key={index}
            onClick={(e) => this.addClearedOrder(ID, e)}>
            {ID}
          </li>)}

      </div>;

    return (
      <div className="container neeb">
        <div className="clear-orders">
          <button className="btn">Clear Completed NE Orders</button>
        </div>
        <div className="neeb-form">
        <h3 className="card-header">Newegg Ebay Sales Order Report</h3>
        
        <form onSubmit={this.onUpload}>
          <div className="form-group">
            <h4> Ebay Report </h4>
            <input className="form-control" ref={(ref) => { this.uploadEB = ref; }} type="file" onChange={this.EBFileSelect} />
            <h4> Newegg Report </h4>
            <input className="form-control" ref={(ref) => { this.uploadNE = ref; }} type="file" />
          </div>
          <button className="btn btn-primary">Upload</button>
        </form>
        </div>
        {this.state.ebOrders.length > 0 ? ebOrders : null}
      </div>
    )
  }
}

export default NeEbReport;


//if ebay only upload report and cleared orders
//if newegg only upload formdata only
//if both first request cleared orders and then send everything as form data