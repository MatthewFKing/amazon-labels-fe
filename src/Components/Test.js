import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Test extends Component {

  state = {
    prodReport: [],
    woReport: []
  };

  url = "http://localhost:3030/test";

  onUploadProd = e => {
    e.preventDefault();
    if (this.uploadInput.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let output = reader.result.split("\n").map(line => {
          return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        });
        console.log(output);
        this.setState({ prodReport: output });
        
      };
      reader.readAsText(this.uploadInput.files[0]);
    }
  };

  onUploadWO = e => {
    e.preventDefault();
    if (this.uploadInput.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let output = reader.result.split("\n").map(line => {
          return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        });
        console.log(output);
        this.setState({ woReport: output });
        
      };
      reader.readAsText(this.uploadwo.files[0]);
    }
  };

  getTest = () => {
    let data = { prod: this.state.prodReport, wo: this.state.woReport }
    axios
      .post(this.url, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const labels = <div className="container">
      <h3 className="card-header"> Amazon Labels </h3>
      <form className="form-inline" >
        <div className="form-group">
        <input
                className="form-control-file"
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
                onChange={this.onUploadProd}
              />
              <br/>
              <br/>
        <input
          className="form-control-file"
          ref={ref => {
            this.uploadwo = ref;
          }}
          type="file"
          onChange={this.onUploadWO}
        />
        </div>
        <small className="text-danger">{this.state.error}</small>
      </form>
      <br/>
      <br/>
      <button className="btn btn-primary" onClick={this.getTest}>Test Get</button>
      
    </div>;
    return (
      <div>
        {labels}
      </div>
    );
  }
}

export default Test;
