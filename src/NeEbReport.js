import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import excelParser from 'excel-parser';
import './App.css';

class NeEbReport extends Component {

  state = {

  }

  onUpload = e => {
    e.preventDefault();
    
  }

  addPO = (po, e) => {
    console.log(e.target);
    if (this.state.poList.indexOf(po) === -1) {
      let poList = [...this.state.poList, po];
      this.setState({ poList });
    } else {
      let poList = [...this.state.poList];
      var index = poList.indexOf(po);
      poList.splice(index, 1);
      this.setState({ poList });
    }
  }

  generate = () => {
    const url = 'http://10.0.0.234:3090/roGen';
    let data = {
      poList: this.state.poList,
      report: this.state.reportData
    };

    axios.post(url,data)
      .then(response => {
        console.log(response);
        const file = new Blob(
          [response.data.output], 
          {type: 'text/csv'});
        fileDownload(file, 'RemovalReport.csv');
        this.setState({ 
          roIDs: [],
          poList: [],
          reportData: [],
          missingParts: response.data.missingParts
        });
      })
      .catch(error=> {
        console.log(error)
      });
  }

  render() {

    return(
      <div className="container">
      <h3>Newegg Ebay Sales Order Report</h3>
        <form onSubmit={this.onUpload}>
          <div className="form-group">
            <h4> Ebay Report </h4>
            <input className="form-control" ref={(ref) => { this.uploadEB = ref; }} type="file" />
            <h4> Newegg Report </h4>
            <input className="form-control" ref={(ref) => { this.uploadNE = ref; }} type="file" />
          </div>
          <button className="btn btn-success">Upload</button>
        </form>
      </div>
    )
  }
}

export default NeEbReport;