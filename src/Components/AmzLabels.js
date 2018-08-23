import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './App.css';

class AmzLabels extends Component {

  state = {
    showRO: false,
    showAL: true,
    showNE: false,
    error: ""
  };

  url = "http://10.0.0.234:3030";

  onUpload = e => {
    e.preventDefault();
    if (!this.uploadInput.files[0]) {
      this.setState({error: "No File Selected"})
    } else {
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      const url = `${this.url}/pdf`;
      axios.post(url, data)
        .then(response => {
          console.log(response)
          this.getFile();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getFile = () => {
    const url = `${this.url}/pdf`;

    axios.get(url, {
      method: 'GET',
      responseType: 'blob'
    })
      .then(response => {
        const file = new Blob(
          [response.data],
          { type: 'application/pdf' });
        fileDownload(file, 'labels.pdf');
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
          <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <button className="btn btn-primary">Upload</button>
        <small className="text-danger">{this.state.error}</small>
      </form>
      
    </div>;
    return (
      <div>
        {labels}
      </div>
    );
  }
}

export default AmzLabels;
