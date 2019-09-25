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
  LineMarkSeries
} from 'react-vis';

class QA extends Component {
  state = {
    error: "",
    dates: [],
    pointData: [],
  };

  url = "http://10.0.0.234:3030";

  data = {
  }

  getit = () => {
    axios.get(`${this.url}/qareport`)
      .then(response => {
        console.log(response.data);
        let dates = response.data.map(entry => {
          //return moment(entry.date).format('L');
          return entry.date;
        });
        dates = [...new Set(dates)].sort();
        console.log(dates);
        this.setState({ dates });
        let pointData = [];
        dates.forEach((date, i) => {
          let pointTotal = response.data.filter(entry => entry.date === date).reduce((total, line) => {
            if (!isNaN(parseInt(line.pointsValue, 10))) {
              return total + parseInt(line.pointsValue, 10);
            } else {
              return total + 0;
            }
        }, 0);
        pointData.push([i, pointTotal]);
        
      });
      this.setState({ pointData })
      });
  }


  render() {
    const data = [
      { x: 1, y: 8 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 8 },
      { x: 9, y: 10 }
    ];
    const dates = [
      '9/1/19',
      '9/2/19',
      '9/3/19',
      '9/4/19',
      '9/5/19',
      '9/6/19',
      '9/7/19',
      '9/8/19',
      '9/9/19',
    ]

    
    
      const graph = (
        <XYPlot height={300} width={1500}
        getX={d => d[0]}
        getY={d => d[1]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis  tickFormat={v => moment(this.state.dates[v]).format('L')}/>
            <YAxis/>
            <LineMarkSeries data={this.state.pointData} />
          </XYPlot>
      );

    return (
      <div className="container neeb">
        <div>
          <button
            className="btn btn-primary"
            onClick={this.getit}>
            Go on, get
      </button>
        </div>

        <div>
          {this.state.pointData.length > 0 ? graph : null}
        </div>
      </div>
    );
  }
}

export default QA;