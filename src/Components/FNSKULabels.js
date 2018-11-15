import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class FNSKULabels extends Component {

  state = {
    orderNumbers: '',
  }

  url = "http://10.0.0.234:3060/pdf/fn";


  addOrders = e => {
    console.log(e.target.value);
    this.setState({ orderNumbers: e.target.value })
  }

  submit = () => {
    const data = this.state.orderNumbers.split('\n');
    axios.post(this.url, data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const labels = <div className='container'>
      <h3 className="card-header"> FNSKU Labels </h3>
      <div className='card'>
        <textarea className="form-control" aria-label="Amount" value={this.state.orderNumbers} onChange={this.addOrders}></textarea>
        <button className='btn' onClick={this.submit}>Submit</button>
      </div>
    </div>;
    return (
      <div>
        {labels}
      </div>
    );
  }
}

export default FNSKULabels;
