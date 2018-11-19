import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Modal from 'react-responsive-modal';
import './App.css';

class FNSKULabels extends Component {

  state = {
    orderNumbers: '',
    errorMessage: [],
    open: false,
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  url = "http://10.0.0.234:3060/pdf/fn";


  addOrders = e => {
    this.setState({ orderNumbers: e.target.value })
  }

  submit = () => {
    const data = this.state.orderNumbers.split('\n');
    axios.post(this.url,data)
      .then(response => {
        if (response.data.message) {
          this.setState({ errorMessage: response.data.message });
          this.onOpenModal();
        } else {
          this.getFile(response.data)
        }
        console.log(response);
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFile = (data) => {
    const url = `${this.url}-final`;
    console.log(data);
    axios({
      url: url,
      method: 'POST',
      data: { file: data},
      responseType: 'blob' //Force to receive data in a Blob Format
    })
      .then(response => {
        const file = new Blob(
          [response.data],
          { type: 'application/pdf' });
        fileDownload(file, 'fnskulabels.pdf');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { open } = this.state;
    const labels = <div className='container'>
      <h3 className="card-header"> FNSKU Labels </h3>
      <div className='card' id="wo-textarea">
        <textarea className="form-control" rows="10" aria-label="Amount" value={this.state.orderNumbers} onChange={this.addOrders}></textarea>
        <button className='btn' onClick={this.submit}>Submit</button>
      </div>
    </div>;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Error</h2>
          {this.state.errorMessage.map((message, index) => (
          <li className={"list-group-item"} key={index}>
            {message}
          </li>
        ))}
        </Modal>
        {labels}
      </div>
    );
  }
}

export default FNSKULabels;
