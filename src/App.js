import React, { Component } from 'react';
import RemovalOrder from './RemovalOrder.js';
import './App.css';
import NeEbReport from './NeEbReport.js';
import AmzLabels from './AmzLabels.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

  render() {
    
    return (
      <Router>
        <div>
        <Route path="/" component={Home}/>
        <Route path="/ro" component={RemovalOrder}/>
        <Route path="/amzlabels" component={AmzLabels}/>
        <Route path="/neebreport" component={NeEbReport}/>
        </div>
      </Router>
    );
  }
}

export default App;
