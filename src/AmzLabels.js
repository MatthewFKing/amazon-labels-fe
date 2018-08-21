import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './App.css';

class AmzLabels extends Component {

  state = {
    showRO: false,
    showAL: true,
    showNE: false
  };

  toggleTest = () => {
    this.setState({ showRO: !this.state.showRO });
  }

  toggleNeEb = () => {
    this.setState({
      showRO: false,
      showAL: false,
      showNE: true
    })
  }

  onUpload = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    const url = 'http://10.0.0.234:3090/pdf';
    axios.post(url, data)
      .then(response => {
        console.log(response)
        this.getFile();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getFile = () => {
    const url = 'http://10.0.0.234:3090/pdf';

    axios.get(url, {
      method: 'GET',
      responseType: 'blob' //Force to receive data in a Blob Format
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
      <h3> Amazon Labels </h3>

      <form onSubmit={this.onUpload}>
        <div className="form-group">
          <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <button className="btn btn-success">Upload</button>
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
