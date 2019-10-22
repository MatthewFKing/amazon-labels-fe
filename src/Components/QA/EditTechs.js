import React from "react";
//import axios from "axios";
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

const EditTechs = props => {
  let selectedTech = '...'
  return (

    <div className="container super_report">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {selectedTech}
  </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {props.techs.map((tech, i) => (
            <a className="dropdown-item" key={i}>{tech.name}</a>
          ))}
        </div>
      </div>
    </div >
  );
}

export default EditTechs;