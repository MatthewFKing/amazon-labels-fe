import React, { Component } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import Instructions from '../Instructions';
import "../App.css";

class WebOrders extends Component {
  state = {
    orderIDs: [],
    webReportData: [],
  };

  url = "http://10.0.0.234:3030/ca";

  onUpload = e => {
    if (this.MagentoReport.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(line => {
          return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(text => {
            //return text.replace(/"/g, "");
            return text;  
          });
        });
        console.log(data);
        this.setState({ orderIDs: data.map(line => line[0]) });
        this.setState({ webReportData: data });
      }
      reader.readAsText(this.MagentoReport.files[0]);
    }
  };

  generate = () => {
    let url = `${this.url}/gen`;
    let data = { 
      eWasteFees: this.state.orderIDs,
      neReport: this.state.neReport
    };

    axios.post(url, data)
    .then(response => {
      const fbReport = new Blob([response.data.fbReport], {
        type: "text/csv"
      });
      fileDownload(fbReport, `NE EB Report.csv`);
    })
    .catch(error => {
      console.log(error);
    });

  }

  setEWaste = (index, e) => {
    const orderIDs = this.state.orderIDs;
    orderIDs[index].amount = e.target.value;
    this.setState({ orderIDs })
  }

  removeOrder = (idIndex, e) => {
    const orderIDs = this.state.orderIDs;
    const neReport = this.state.neReport;
    const reportIndex = neReport.findIndex(line => line['Order Number'] === orderIDs[idIndex].id);
    neReport.splice(reportIndex, 1);
    orderIDs.splice(idIndex, 1);
    this.setState({ orderIDs, neReport });
  }

  render() {

    return (
      <div className="container neeb">
        
        <div className="neeb-form">
          <h3 className="card-header">Web Order Import</h3>

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <h4> Magento Report </h4>
              <input
                className="form-control-file"
                ref={ref => {
                  this.MagentoReport = ref;
                }}
                type="file"
                onChange={this.onUpload}
              />
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>

        </div>
        <Instructions/>
      </div>
    );
  }
}

export default WebOrders;