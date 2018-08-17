import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './App.css';

class RemovalOrder extends Component {

  state = {
    roIDs: [],
    poList: [],
    reportData: [],
    missingParts: [],
  }

  onUpload = e => {
    e.preventDefault();
    const url = 'http://10.0.0.234:3090/ro';
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result.split("\n").map(line => {
        return line.split(/,?\s+/);
      });
      this.setState({ reportData: data });
      axios.post(url, data)
        .then(response => {
          this.setState({ roIDs: response.data });
        })
        .catch(error => {
          console.log(error)
        });
    }
    reader.readAsText(this.uploadInput.files[0]);
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
        fileDownload(file, 'report.csv');
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
    const poList = 
    <div>
    {this.state.roIDs.map((ID, index) =>
      <li className={this.state.poList.indexOf(ID) > -1 ? 'list-group-item active' : 'list-group-item'} key={index} onClick={(e) => this.addPO(ID, e)}>
        {ID}
      </li>
    )}
    <button className='btn' onClick={this.generate}>Submit</button>
    </div>;

    const missingPartsList = 
    <div>
    <h3>Parts needed in Fishbowl</h3>
    {this.state.missingParts.map((part, index) =>
      <li className='list-group-item' key={index}>
        {part}
      </li>
    )}</div>;
    return(
      <div className="container">
      <h3>Removal Order Generator</h3>
        <form onSubmit={this.onUpload}>
          <div className="form-group">
            <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <button className="btn btn-success">Upload</button>
        </form>
        {this.state.roIDs.length > 1 ? poList : null}
        {this.state.missingParts.length > 1 ? missingPartsList : null}
      </div>
    )
  }
}

export default RemovalOrder;