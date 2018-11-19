import React, { Component } from 'react';
import RemovalOrder from './RemovalOrder.js';
import './App.css';
import NeEbReport from './NeEbReport.js';
import AmzLabels from './AmzLabels.js';
import HomeReport from './HomeReport.js';
import NeweggCA from './NeweggCA';
import AmazonCA from './AmazonCA';
import Nav from './Nav.js';
import Sidebar from './Sidebar';
import FNSKULabels from './FNSKULabels';
import Test from './Test.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

  render() {
    
    return (
      <Router>
        <div className="main">
        <Route path="/" component={Nav}/>
        <Route path='/' component={Sidebar}/>
        <Route exact path="/" component={HomeReport}/>
        <Route path="/Home" component={HomeReport}/>
        <Route path="/ro" component={RemovalOrder}/>
        <Route path="/amzlabels" component={AmzLabels}/>
        <Route path="/neebreport" component={NeEbReport}/>
        <Route path="/test" component={Test}/>
        <Route path="/ca" component={NeweggCA}/>
        <Route path="/amzca" component={AmazonCA}/>
        <Route path="/fnsku" component={FNSKULabels}/>
        
        </div>
      </Router>
    );
  }
}

export default App;
