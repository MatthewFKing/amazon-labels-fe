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
    techs: [],
    selectedTech: [],
    staticData: [ [ 0, 60 ],
    [ 1, 64 ],
    [ 2, 36 ],
    [ 3, 91 ],
    [ 4, 88 ],
    [ 5, 62 ],
    [ 6, 54 ],
    [ 7, 79 ],
    [ 8, 55 ],
    [ 9, 38 ],
    [ 10, 92 ],
    [ 11, 60 ],
    [ 12, 72 ],
    [ 13, 92 ],
    [ 14, 65 ],
    [ 15, 110 ],
    [ 16, 32 ] ],
  };

  url = "http://10.0.0.234:3030";

  data = {
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(`${this.url}/qainfo`)
      .then(response => {
        console.log(response.data);
        this.setState({ techs: response.data })

      })
      .catch(error => {
        console.log(error);
      });
  }

  addTech = () => {
    const techs = [
      {
        name: "Donald White",
        number: '43674645',
      },
      {
        name: "Jack Carlson",
        number: '54112302',
      },
      {
        name: "Scott Kaplan",
        number: '28959002',
      },
      {
        name: "Jason Wilson",
        number: '13341839',
      },
      {
        name: "Scott Simpich",
        number: '73859172',
      },
      {
        name: "Daniel McMahon",
        number: '64633986',
      },
      {
        name: "Jairo Montenegro",
        number: '14767040',
      },
      {
        name: "Alex Gilson",
        number: '77963380',
      },
      {
        name: "Amber Ponder",
        number: '64939844',
      },
      {
        name: "Sean Stramaglia",
        number: '93957871',
      },
      {
        name: "Valeria Collins",
        number: '56376783',
      },
      {
        name: "Nicholas Bryant",
        number: '19095000',
      },
      {
        name: "Brian Summers",
        number: '57529758',
      },
      {
        name: "Blake Hayes",
        number: '29526354',
      },
      {
        name: "Daniel Horton",
        number: '55404809',
      },
      {
        name: "Ryan Boschen",
        number: '26886522',
      },
      {
        name: "Logan Simmons",
        number: '12450483',
      },
      {
        name: "Delonte Inniss",
        number: '19802526',
      },
      {
        name: "Alistar Feury",
        number: '53443113',
      },
      {
        name: "Anthony Doersch",
        number: '88801665',
      },
      {
        name: "Collin Lemmiksoo",
        number: '14834646',
      },
    ];
    axios.post(`${this.url}/qainfo`, techs)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  getit = (number) => {
    console.log(number);
    axios.post(`${this.url}/qalog`, {number})
      .then(response => {
        console.log(response.data);
        this.setState({ pointData: response.data.pointData });
        this.setState({ dates: response.data.dates });
      });
  }


  render() {



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
          {this.state.techs.map((tech,i) => (
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
            onClick={this.getit}>
            Go on, get
          </button>
          <button
            className="btn btn-primary"
            onClick={this.addTech}>
            Add it
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