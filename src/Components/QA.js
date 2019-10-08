import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import "./App.css";
import '../../node_modules/react-vis/dist/style.css';
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries,
} from 'react-vis';

class QA extends Component {
  state = {
    error: "",
    dates: [],
    pointData: [],
    techReport: {},
    techs: [],
    selectedTech: [],
    staticData: [],
  };

  url = "http://10.0.0.234:3030/qa";

  data = {
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(`${this.url}/qainfo`)
      .then(response => {
        //console.log(response.data);
        this.setState({ techs: response.data })

      })
      .catch(error => {
        console.log(error);
      });
  }

  addTech = () => {
    const techs = [];
    axios.post(`${this.url}/qainfo`, techs)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateLog = () => {
    axios.get(`${this.url}/updatelog`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateMonth = () => {
    axios.get(`${this.url}/updatemonth`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  getit = (number) => {
    console.log(number);
    axios.post(`${this.url}/qalog`, { number })
      .then(response => {
        //console.log(response.data);
        this.setState({ pointData: response.data.pointData });
        this.setState({ dates: response.data.dates });
      })
      .catch(error => {
        console.log(error)
      });

      axios.post(`${this.url}/techreport`, { number })
      .then(response => {
        //console.log(response.data);
        this.setState({ techReport: response.data });
        console.log('techReport')
      })
      .catch(error => {
        console.log(error)
      });

      
  }


  render() {


    let table = null;

    if (this.state.techReport.prodPoints){
      
    
    table = (
      <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Best Day: {moment(this.state.techReport.bestDay[0]).format('L')} {this.state.techReport.bestDay[1]}pts</td>
                <td>Average Points: {parseInt(this.state.techReport.totalPoints / this.state.techReport.daysWorked, 10)}</td>
                <td>Days Worked: {this.state.techReport.daysWorked}</td>
              </tr>
            </tbody>
          </table>
    );
    } else {
      table = (<div>table</div>)
    }
    

    const graph = (
      <XYPlot height={300} width={1500}
        yDomain={[0, 150]}
        getX={d => d[0]}
        getY={d => d[1]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={v => moment(this.state.dates[v + 1]).format('L')} />
        <YAxis />
        <LineMarkSeries data={this.state.pointData} />
        <LineMarkSeries data={this.state.staticData} />
      </XYPlot>
    );

    return (
      <div className="container graphs">

        <div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Tech Names">
            <button type="button" className="btn btn-secondary">Total</button>
            {this.state.techs.map((tech, i) => (
              <button type="button"
                className="btn btn-secondary"
                onClick={e => this.getit(tech.number)}
                key={i}>
                {tech.name}

              </button>
            ))}
          </div>
          <button
            className="btn btn-primary"
            onClick={this.updateLog}>
            UpdateLog
          </button>
          <button
            className="btn btn-primary"
            onClick={this.updateMonth}>
            Update Month
          </button>
        </div>

        <div>
          {this.state.techReport.prodPoints ? graph : null}
        </div>

        <div>
          {this.state.techReport.prodPoints ? table : null}
        </div>
      </div>
    );
  }
}

export default QA;