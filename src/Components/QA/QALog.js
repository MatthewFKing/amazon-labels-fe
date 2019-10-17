import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import QATable from './QATable';
import "../App.css";
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import { DateRangePicker } from 'react-dates';



//add date range - done
//search partial - done
//search SKU - done
//number of returned entries - done
//pages
//this month, last month, 7 days, 30 days

class QALog extends Component {
  state = {
    searchValue: "",
    foundEntries: [],
    searchType: "serial",
    endDate: null,
    startDate: null,
    loading: false,
    id: "qa"


  }

  

  url = "http://10.0.0.234:3030/qa";


  getit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.postSearch();
  }

  postSearch = () => {
    this.props.history.push(`/qalog/:${this.state.searchValue}`, this.state)
    let date = null;
    if (this.state.startDate) {
      date = {
        start: moment(this.state.startDate._d).startOf('day'),
        end: moment(this.state.endDate._d).endOf('day')
      };
    }
    let data = { query: this.state.searchValue.split(','),
                 type: this.state.searchType,
                 date };
    axios.post(`${this.url}/qasearch`, data)
      .then(response => {
        this.setState({ foundEntries: response.data, loading: false })
      })
      .catch(error => {
        console.log(error);
      });
  }

  search = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  setSearchType = (e) => {
    this.setState({ searchType: e.target.value })
  }

  archiveLog = () => {
    axios.get(`${this.url}/archive`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  searchEntry = async (value, type) => {
    console.log(value, type);
    await this.setState({ searchType: type, searchValue: value });
    this.postSearch();
  }


  render() {


    const { foundEntries } = this.state;

    return (
      <div className="container graphs">
        <div className="qalog_filters">
          {/* <button type="button" className="btn btn-primary btn-sm" onClick={this.archiveLog}>Archive Log</button> */}
          <br />
          <form className='form-inline' onSubmit={this.getit}>
            <select value={this.state.searchType} onChange={this.setSearchType} className="custom-select" id="inputGroupSelect02">
              <option value='serial'>SN</option>
              <option value='invoice_number'>Invoice #</option>
              <option value="order_id">Order #</option>
              <option value="tracking_number">Tracking #</option>
              <option value="sku">SKU</option>
              <option value="tech_number">Tech #</option>
            </select>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
              value={this.state.searchValue}
              onChange={this.search} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="start_date_id"
            endDate={this.state.endDate}
            endDateId="end_date_id"
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            isOutsideRange={() => false}
            minimumNights={0}
            showClearDates={true}
          />
        </div>
        <br />

        <QATable
          foundEntries={foundEntries}
          isLoading={this.state.loading}
          searchEntry={this.searchEntry}
        />

      </div>
    );
  }
}

export default QALog;