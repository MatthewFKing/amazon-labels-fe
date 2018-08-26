import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Test extends Component {

  state = {

  };

  url = "http://localhost:3030";

  onUpload = e => {
    e.preventDefault();
      const data = { current: parseInt(this.uploadInput.value, 10) };
      console.log(data);
      const url = `${this.url}/test`;
      axios.post(url, data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
  };

  getTest = () => {
    const url = `${this.url}/ca`;

    axios.get(url)
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
      <form className="form-inline" onSubmit={this.onUpload}>
        <div className="form-group">
          <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="text" />
        </div>
        <button className="btn btn-primary">Upload</button>
        <small className="text-danger">{this.state.error}</small>
      </form>
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
