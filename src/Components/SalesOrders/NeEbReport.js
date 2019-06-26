import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import "../App.css";

class NeEbReport extends Component {
  state = {
    error: "",
    ebOrders: [],
    clearedEBOrders: [],
    ebReport: [],
    lastOrders: [],
    toggleDeleteIDs: false,
    ordersToDelete: [],
  };

  url = "http://10.0.0.234:3030";

  componentDidMount() {
    let url = `${this.url}/nenum`;
    axios.get(url)
      .then(response => {
        let lastOrders = response.data.map(order => {
          return order.ID;
        });
        this.setState({ lastOrders });
      })
      .catch(error => {
        console.log(error);
      })
  }

  toggleDeleteIDs = () => {
    this.setState({ toggleDeleteIDs: !this.state.toggleDeleteIDs });
  }

  onUpload = e => {
    e.preventDefault();
    let data = null;
    let url = `${this.url}/neebreport`;

    if (this.uploadEB.files[0] && !this.uploadNE.files[0]) {
      url = `${this.url}/ebreport`;
      data = {
        report: this.state.ebReport,
        clearedOrders: this.state.clearedEBOrders
      };
    } else if (!this.uploadEB.files[0] && this.uploadNE.files[0]) {
      data = new FormData();
      data.append("file", this.uploadNE.files[0]);
    } else if (this.uploadEB.files[0] && this.uploadNE.files[0]) {
      data = new FormData();
      data.append("file", this.uploadNE.files[0]);
      data.append("ebReport", this.state.ebReport);
      data.append("clearedOrders", this.state.clearedEBOrders);
    }

    axios
      .post(url, data)
      .then(response => {
        const fbReport = new Blob([response.data.fbReport], {
          type: "text/csv"
        });
        fileDownload(fbReport, `NE EB Report.csv`);
        this.setState({
          ebOrders: [],
          clearedEBOrders: [],
          ebReport: [],
        });
        this.uploadEB.value = null;
        this.uploadNE.value = null;
      })
      .catch(error => {
        console.log(error);
      });
  };

  EBFileSelect = e => {
    if (this.uploadEB.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result.split("\n").map(line => {
          return line.split(/,/).map(text => {
            return text.replace(/"/g, "");
          });
        });
        console.log(data);
        let orders = data.filter(line => {
          return line[11] === "United States";
        });

        this.setState({ ebReport: orders });

        this.setState({ ebOrders: orders.map(line => line[0]) });
      };
      reader.readAsText(this.uploadEB.files[0]);
    }
  };

  addClearedOrder = (id, e) => {
    if (this.state.clearedEBOrders.indexOf(id) === -1) {
      let clearedEBOrders = [...this.state.clearedEBOrders, id];
      this.setState({ clearedEBOrders });
    } else {
      let clearedEBOrders = [...this.state.clearedEBOrders];
      var index = clearedEBOrders.indexOf(id);
      clearedEBOrders.splice(index, 1);
      this.setState({ clearedEBOrders });
    }
  };

  addToDelete = (id, e) => {
    if (this.state.ordersToDelete.indexOf(id) === -1) {
      let ordersToDelete = [...this.state.ordersToDelete, id];
      this.setState({ ordersToDelete });
    } else {
      let ordersToDelete = [...this.state.ordersToDelete];
      var index = ordersToDelete.indexOf(id);
      ordersToDelete.splice(index, 1);
      this.setState({ ordersToDelete });
    }
  }

  deleteOrders = () => {
    let data = this.state.ordersToDelete;
    axios.post(`${this.url}/neid`, data)
      .then(response => {
        window.location.reload()
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const ebOrders = (
      <div className="card eb-clear">
        <h4 className="card-header">Select Cleared Ebay Orders</h4>
        {this.state.ebOrders.map((ID, index) => (
          <li
            className={
              this.state.clearedEBOrders.indexOf(ID) > -1
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={e => this.addClearedOrder(ID, e)}
          >
            {ID}
          </li>
        ))}
      </div>
    );

    const completedOrders = (
      <div className="last-orders">
        <h5 className="card-header">Select the Orders to Remove</h5>
        {this.state.lastOrders.map((ID, index) => (
          <li
            className={
              this.state.ordersToDelete.indexOf(ID) > -1
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={e => this.addToDelete(ID, e)}
            key={index}>
            {ID}
          </li>
        ))}
        <button className='btn btn-danger' onClick={this.deleteOrders}>Delete</button>
      </div>
    );

    return (
      <div className="neeb">

        <div className="neeb-form">
          <h3 className="card-header">Newegg Ebay Sales Order Report</h3>

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <h4>Ebay Report</h4>
              <input
                className="form-control-file"
                ref={ref => {
                  this.uploadEB = ref;
                }}
                type="file"
                onChange={this.EBFileSelect}
              />
              <br />
              <div className='ne-header'>
                <h4>Newegg Report</h4><p>Last Completed: {this.state.lastOrders[0]}</p>
              </div>
              <input
                className="form-control-file"
                ref={ref => {
                  this.uploadNE = ref;
                }}
                type="file"
              />
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>
          {this.state.ebOrders.length > 0 ? ebOrders : null}
        </div>

        <div className="instructions">
          <button className='btn btn-warning' onClick={this.toggleDeleteIDs}>Clear Orders</button>
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
              <p>1. Download the Sales Report from Newegg (make sure that the advanced search is set to <mark>"Order Status: Unshipped"</mark> and <mark>"Fulfill By: Seller"</mark>).</p>
              <p>2. Drag the downloaded reports to their corresponding upload sections.</p>
              <p>3. If uploaded an Ebay Report select the cleared Ebay Order Numbers.</p>
              <p>4. Click "Submit" at the bottom of this list and the Fishbowl Sales Orders Report will be
              downloaded.</p>
              <p>5. Open Fishbowl and click File -> Import -> Sales Orders and
              select the downloaded file.</p>
              <p>6. Verify that the correct orders have been uploaded.</p>
            </div>
          </div>
        </div>


        {this.state.toggleDeleteIDs ? completedOrders : null}
      </div>
    );
  }
}

export default NeEbReport;

    //if ebay only upload report and cleared orders
    //if newegg only upload formdata only
    //if both first request cleared orders and then send everything as form data
