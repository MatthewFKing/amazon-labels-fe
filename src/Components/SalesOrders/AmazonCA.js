import React, { Component } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import "../App.css";

class AmazonCA extends Component {
  state = {
    orderIDs: [],
    neReport: [],
    caUnshippedOrders: [],
    caAllOrders: [],
    caOrderIDs: [],
    clearedOrders: [],
    error: '',
  };

  url = "http://10.0.0.234:3060/ca/amz";

  onUploadUnshipped = e => {
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result.split("\n").map(line => {
        return line.split(/,?\t/);
      });
      let caUnshippedOrders = data.filter(line => {
        return line[27] === 'CA';
      });
      let caOrderIDs = caUnshippedOrders.map(order => order[0]);
      this.setState({ caUnshippedOrders, caOrderIDs });
    }

    reader.readAsText(this.AmazonUnshipped.files[0]);
  };

  onUploadAll = e => {
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result.split("\n").map(line => {
        return line.split(/,?\t/);
      });
      let caAllOrders = data.filter(line => {
        return line[31] === 'CA';
      });
      this.setState({ caAllOrders })
    }

    reader.readAsText(this.AmazonAllOrders.files[0]);
  }

  generate = () => {
    if (this.state.caAllOrders.length > 0 && this.state.clearedOrders.length > 0) {
      let url = `${this.url}/gen`;
      let data = {
        caUnshippedOrders: this.state.caUnshippedOrders,
        caAllOrders: this.state.caAllOrders,
        clearedOrders: this.state.clearedOrders
      };

      axios.post(url, data)
        .then(response => {
          const fbReport = new Blob([response.data.fbReport], {
            type: "text/csv"
          });
          fileDownload(fbReport, `AmzCAReport.csv`);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      let error = this.state.clearedOrders.length === 0
        ? "No orders selected!"
        : "You must upload the All Orders Report!";
      this.setState({ error });
    }

  }

  addClearedOrder = (id, e) => {
    if (this.state.clearedOrders.indexOf(id) === -1) {
      let clearedOrders = [...this.state.clearedOrders, id];
      this.setState({ clearedOrders });
    } else {
      let clearedOrders = [...this.state.clearedOrders];
      var index = clearedOrders.indexOf(id);
      clearedOrders.splice(index, 1);
      this.setState({ clearedOrders });
    }
  };

  render() {

    const orderIDList = (
      <div className="card eb-clear">
        <h5 className="card-header">Select Orders to Drop</h5>
        {this.state.caOrderIDs.map((ID, index) => (
          <li
            className={
              this.state.clearedOrders.indexOf(ID) > -1
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={e => this.addClearedOrder(ID, e)}
            key={index}>
            <div className="e-waste-list">
              <p className="mb-1">{ID}</p>
            </div>
          </li>
        ))}
        <button className="btn" onClick={this.generate}>Submit</button>
      </div>
    );

    return (
      <div className="container neeb">
        
        <div className="neeb-form">
          <h3 className="card-header">Amazon Canada Order Report</h3>

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <h4>Amazon Unshipped Report</h4>

                  <input
                    className="form-control-file"
                    id="inputGroupFile01"
                    ref={ref => {
                      this.AmazonUnshipped = ref;
                    }}
                    type="file"
                    onChange={this.onUploadUnshipped}
                  />
                  <br/>
              <h4>Amazon All Orders Report</h4>
                  <input
                    className="form-control-file"
                    id="inputGroupFile02"
                    ref={ref => {
                      this.AmazonAllOrders = ref;
                    }}
                    type="file"
                    onChange={this.onUploadAll}
                  />

            </div>
            {this.state.error ? <div class="alert alert-danger" role="alert">{this.state.error}</div> : null}
          </form>
        </div>
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
              <p>1. Download an updated Unshipped Order Report from Amazon. <a className="" rel="noopener noreferrer" href="https://sellercentral.amazon.com/order-reports-and-feeds/reports/unshippedOrders#" target="_blank">Link</a></p>
              <p>2. Download an updated Amazon All Orders Report. <a className="" rel="noopener noreferrer" href="https://sellercentral.amazon.com/gp/ssof/reports/search.html#orderAscending=&recordType=FlatFileAllOrdersReport&noResultType=&merchantSku=&fnSku=&FnSkuXORMSku=&reimbursementId=&orderId=&genericOrderId=&asin=&lpn=&shipmentId=&problemType=ALL_DEFECT_TYPES&hazmatStatus=&inventoryEventTransactionType=&fulfillmentCenterId=&inventoryAdjustmentReasonGroup=&eventDateOption=1&fromDate=mm%2Fdd%2Fyyyy&toDate=mm%2Fdd%2Fyyyy&startDate=&endDate=&fromMonth=1&fromYear=2018&toMonth=1&toYear=2018&startMonth=&startYear=&endMonth=&endYear=#" target="_blank">Link</a></p>
              <p>3. Drag the reports to their corresponding sections.</p>
              <p>4. Select the Amazon orders that need to be dropped from the list. </p>
              <p>5. Click "Submit" and the Fishbowl Report will be downloaded.</p>
              <p>6. Import the sales report to Fishbowl and verify the information is correct.</p>
            </div>
          </div>
        </div>
        {this.state.caOrderIDs.length > 0 ? orderIDList : null}
      </div>
    );
  }
}

export default AmazonCA;