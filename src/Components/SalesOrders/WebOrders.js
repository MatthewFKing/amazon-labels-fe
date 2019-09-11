import React, { Component } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import Instructions from '../Instructions';
import "../App.css";

class WebOrders extends Component {
  state = {
    orderIDs: [],
    webReportData: [],
    selectedWebOrders: [],
  };

  url = "http://10.0.0.234:3030/web";

  onUploadMagento = e => {
    if (this.MagentoReport.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(line => {
          return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(text => {
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

  onUploadInvoices = e => {
    let selectedWebOrders = [];
    Array.from(e.target.files).forEach(file => { 
      console.log(file.name.substring(11, 21));
      selectedWebOrders.push(file.name.substring(11, 21))
    });
    this.setState({ selectedWebOrders });
  }

  addClearedOrder = (id, e) => {
    if (this.state.selectedWebOrders.indexOf(id) === -1) {
      let selectedWebOrders = [...this.state.selectedWebOrders, id];
      this.setState({ selectedWebOrders });
    } else {
      let selectedWebOrders = [...this.state.selectedWebOrders];
      let index = selectedWebOrders.indexOf(id);
      selectedWebOrders.splice(index, 1);
      this.setState({ selectedWebOrders });
    }
  };

  generate = () => {
    let url = `${this.url}`;
    let data = { 
      report: this.state.webReportData,
      selectedOrders: this.state.selectedWebOrders
    };

    axios.post(url, data)
    .then(response => {
      console.log(response);
      const fbReport = new Blob([response.data.fbReport], {
        type: "text/csv"
      });
      fileDownload(fbReport, `Web Report.csv`);
    })
    .catch(error => {
      console.log(error);
    });

  }

  render() {

    // const webOrders = (
    //   <div className="card eb-clear">
    //     <h4 className="card-header">Select Web Orders to Import</h4>
    //     {this.state.orderIDs.map((ID, index) => (
    //       <li
    //         className={
    //           this.state.selectedWebOrders.indexOf(ID) > -1
    //             ? "list-group-item active"
    //             : "list-group-item"
    //         }
    //         key={index}
    //         onClick={e => this.addClearedOrder(ID, e)}
    //       >
    //         {ID}
    //       </li>
    //     ))}
    //   </div>
    // );

    return (
      <div className="container neeb">
        
        <div className="neeb-form">
          <h3 className="card-header">Web Order Import</h3>

          <form onSubmit={this.generate}>
            <div className="form-group">
              <h4> Magento Report </h4>
              <input
                className="form-control-file"
                ref={ref => {
                  this.MagentoReport = ref;
                }}
                type="file"
                onChange={this.onUploadMagento}
              />
              <br/>
              <h4> Select Invoices </h4>
              <input
                className="form-control-file"
                ref={ref => {
                  this.invoices = ref;
                }}
                type="file"
                multiple
                onChange={this.onUploadInvoices}
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