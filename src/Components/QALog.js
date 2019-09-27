import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import "./App.css";

class QALog extends Component {
  state = {
    searchValue: ""
  }


  getit = () => {
    console.log('hi');
  }

  search = (e) => {
    
  }


  render() {

    return (
      <div className="container graphs">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            value={this.state.searchValue}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
        );
      }
    }
    
export default QALog;