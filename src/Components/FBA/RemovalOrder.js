import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import "../App.css";

class RemovalOrder extends Component {
  state = {
    roIDs: [],
    poList: [],
    reportData: [],
    missingParts: [],
    error: "",
    ufNum: 0,
    editUF: false
  };

  url = "http://10.0.0.234:3030";

  componentDidMount() {
    this.updateUF();
  }

  updateUF = () => {
    const url = `${this.url}/ro/ufnum`;
    axios
      .get(url)
      .then(response => {
        this.setState({ ufNum: response.data[0].current });
      })
      .catch(error => {
        console.log(error);
      });
  };

  UfEdit = e => {
    if (!this.state.editUF) {
      this.setState({ editUF: !this.state.editUF });
    } else {
      const url = `${this.url}/ro/ufnum`;
      let data = { current: parseInt(this.state.ufNum, 10) };
      axios
        .post(url, data)
        .then(response => {
          this.setState({ editUF: !this.state.editUF });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  updateUfNum = e => {
    this.setState({ ufNum: e.target.value });
  };

  onUpload = e => {
    e.preventDefault();

    if (!this.uploadInput.files[0]) {
      this.setState({ error: "No File Selected" });
    } else {
      const url = `${this.url}/ro`;
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result.split("\n").map(line => {
          return line.split(/,?\s+/);
        });
        this.setState({ reportData: data });
        axios
          .post(url, data)
          .then(response => {
            this.setState({ roIDs: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      };
      reader.readAsText(this.uploadInput.files[0]);
    }
  };

  onUploadParts = async (e) => {
    e.preventDefault();
    if (this.partsList.files[0]) {
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(line => {
        return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(text => {
          return text;  
        });
      });
      console.log(data);
      
    }
    reader.readAsText(this.partsList.files[0]);
  }
  };

  addPO = (po, e) => {
    if (this.state.poList.indexOf(po) === -1) {
      let poList = [...this.state.poList, po];
      this.setState({ poList });
    } else {
      let poList = [...this.state.poList];
      var index = poList.indexOf(po);
      poList.splice(index, 1);
      this.setState({ poList });
    }
  };

  generate = () => {
    const url = `${this.url}/ro/gen`;
    if (!this.state.poList) {
      this.setState({ error: "No Removal Orders Selected" });
    } else {
      let data = {
        poList: this.state.poList,
        report: this.state.reportData,
        ufNumber: this.state.ufNum
      };

      axios
        .post(url, data)
        .then(response => {
          const roFile = new Blob([response.data.toReport], {
            type: "text/csv"
          });
          const invFile = new Blob([response.data.invReport], {
            type: "text/csv"
          });
          const partFile = new Blob([response.data.partReport], {
            type: "text/csv"
          });
          fileDownload(roFile, "RemovalReport.csv");
          fileDownload(invFile, "AddInventory.csv");
          fileDownload(partFile, "AddParts.csv");

          this.updateUF();

          this.setState({
            roIDs: [],
            poList: [],
            reportData: []
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const poList = (
      <div className='ro-order-list'>
        <h5>Select Order IDs</h5>
        {this.state.roIDs.map((ID, index) => (
          <li
            className={
              this.state.poList.indexOf(ID) > -1
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={e => this.addPO(ID, e)}
          >
            {ID}
          </li>
        ))}
        <button className="btn" onClick={this.generate}>
          Submit
        </button>
      </div>
    );

    const missingPartsList = (
      <div>
        <h3>Parts needed in Fishbowl</h3>
        {this.state.missingParts.map((part, index) => (
          <li className="list-group-item" key={index}>
            {part}
          </li>
        ))}
      </div>
    );

    return (
      <div className="neeb">

        <div className="neeb-form">
          <h3 className="card-header">Removal Order Generator</h3>
          <form className="form-inline" onSubmit={this.onUpload}>
            <div className="form-group">
              <input
                className="form-control-file"
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
            </div>
            <button className="btn btn-primary">Upload</button>
            <small className="text-danger">{this.state.error}</small>
          </form>


          <h3 className="card-header">Update Parts List</h3>
          <form className="form-inline" >
            <div className="form-group">
              <input
                className="form-control-file"
                id="inputGroupFile01"
                ref={ref => {
                  this.partsList = ref;
                }}
                type="file"
                onChange={this.onUploadParts}
              />
            </div>
            <button onClick={this.onUploadParts} className="btn btn-primary">Upload</button>
          </form>
          <form className="form-inline">
            <div className="form-row align-items-center card-body">
              <div className="col-auto">
                {!this.state.editUF ? (
                  <p className="card-text">
                    Current UF Number: UF00
                    {this.state.ufNum}
                  </p>
                ) : (
                    <input
                      type="text"
                      className="form-control-file mb-2"
                      placeholder="1234"
                      value={this.state.ufNum}
                      onChange={this.updateUfNum}
                    />
                  )}
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={this.UfEdit}
                >
                  {!this.state.editUF ? "Edit" : "Submit"}
                </button>
              </div>
            </div>
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
              <p>1. Download the Removal Order Detail Report from Amazon.
                <a className="" rel="noopener noreferrer" href="https://sellercentral.amazon.com/gp/ssof/reports/search.html#orderAscending=&recordType=REMOVAL_ORDER_DETAIL&noResultType=&merchantSku=&fnSku=&FnSkuXORMSku=&reimbursementId=&orderId=&genericOrderId=&asin=&lpn=&shipmentId=&problemType=ALL_DEFECT_TYPES&hazmatStatus=&inventoryEventTransactionType=&fulfillmentCenterId=&inventoryAdjustmentReasonGroup=&eventDateOption=1&fromDate=mm%2Fdd%2Fyyyy&toDate=mm%2Fdd%2Fyyyy&startDate=&endDate=&fromMonth=1&fromYear=2018&toMonth=1&toYear=2018&startMonth=&startYear=&endMonth=&endYear=" target="_blank"> Link</a>
              </p>
              <p>2. Drag the downloaded file to the Removal Order Generator section.</p>
              <p>3. Select the Order IDs that you need from the list.</p>
              <p>4. Click "Submit" at the bottom of this list and the Fishbowl TO, Parts and Inventory Reports will be
              downloaded.</p>
              <p>5. Open Fishbowl and upload the reports in this order: Parts - Inventory - TO</p>
              <p>6. Verify that the correct information has been uploaded to Fishbowl.</p>
            </div>
          </div>
        </div>
        {this.state.roIDs.length > 0 ? poList : null}
        {this.state.missingParts.length > 1 ? missingPartsList : null}
      </div>
    );
  }
}

export default RemovalOrder;
