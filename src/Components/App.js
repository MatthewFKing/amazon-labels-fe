import React, { Component } from 'react';
import RemovalOrder from './RemovalOrder.js';
import './App.css';
import NeEbReport from './NeEbReport.js';
import AmzLabels from './AmzLabels.js';
import HomeReport from './HomeReport.js';
import NeweggCA from './NeweggCA';
import Nav from './Nav.js';
import Test from './Test.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

  render() {
    
    return (
      <Router>
        <div>
        <Route path="/" component={Nav}/>
        <Route exact path="/" component={HomeReport}/>
        <Route path="/Home" component={HomeReport}/>
        <Route path="/ro" component={RemovalOrder}/>
        <Route path="/amzlabels" component={AmzLabels}/>
        <Route path="/neebreport" component={NeEbReport}/>
        <Route path="/test" component={Test}/>
        <Route path="/ca" component={NeweggCA}/>
        </div>
      </Router>
    );
  }
}

export default App;
