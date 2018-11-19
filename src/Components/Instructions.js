import React, { Component } from 'react';
import './App.css';

class Instructions extends Component {

  render() {

    return (
      <div className="instructions">
          <button
            className="btn btn-light"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Instructions
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <h4>Instructions for Use:</h4>
              <p>1. Download the Sales Report from Newegg Canada (make sure that the advanced search is set to <mark>"Order Status: Unshipped"</mark>).
              <a className="" rel="noopener noreferrer" href="https://sellerportal.newegg.com/can/manage-order/orderlist" target="_blank"> Link</a></p>
              <p>2. Drag the downloaded Newegg Report to the file upload section.</p>
              <p>3. Click "Upload" and enter the GST Fees for each order.</p>
              <p>4. Click "Submit" at the bottom of this list and the Fishbowl Sales Orders Report will be
              downloaded.</p>
              <p>5. Open Fishbowl and click File -> Import -> Sales Orders and
              select the downloaded file.</p>
              <p>6. Verify that the correct orders have been uploaded.</p>
            </div>
          </div>
        </div>
    );
  }
}

export default Instructions;