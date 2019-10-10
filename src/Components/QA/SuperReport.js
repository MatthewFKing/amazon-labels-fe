import React, { Component } from "react";
import axios from "axios";
//import moment from 'moment';
import "../App.css";
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
//import { DateRangePicker } from 'react-dates';


//Copy of QA Log
//Techs for each super
//Entries per tech / all techs
//Points per tech
//enter hours
//

class SuperReport extends Component {
  state = {
    unselectedTechs: this.props.techs,
    selectedTechs: [],
  }


  url = "http://10.0.0.234:3030/qa";

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(`${this.url}/qainfo`)
      .then(response => {
        //console.log(response.data);
        this.setState({ unselectedTechs: response.data })

      })
      .catch(error => {
        console.log(error);
      });
  }

  leftToRight = (index) => {
    this.setState(({ unselectedTechs, selectedTechs }) => {
      const left = [...unselectedTechs]
      const right = [...selectedTechs, ...left.splice(index, 1)]
      return { unselectedTechs: left, selectedTechs: right }
    })
  }

  rightToLeft = (index) => {
    this.setState(({ unselectedTechs, selectedTechs }) => {

      const right = [...selectedTechs,]
      const left = [...unselectedTechs, ...right.splice(index, 1)]
      return { unselectedTechs: left, selectedTechs: right }
    })
  }


  render() {


    return (
      
      <div className="container super_report">
        <div className="row">
          <div className="card select_group">
            <div className="card-header">
              Unselected Techs
          </div>
            <div className="btn-group-vertical ">
              {this.state.unselectedTechs.map((value, i) => (
                <button value={i} key={i} onClick={() => this.leftToRight(i)} className="btn btn-secondary">{value.name}</button>
              ))}
            </div>
          </div>
          <div className="card select_group">
            <div className="card-header">
              Selected Techs
          </div>
            <div className="btn-group-vertical select_group">
              {this.state.selectedTechs.map((value, i) => (
                <button value={i} key={i} onClick={() => this.rightToLeft(i)} className="btn btn-secondary">{value.name}</button>
              ))}
            </div>
          </div>
      </div>

      </div >
    );
  }
}

export default SuperReport;