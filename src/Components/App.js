import React, { Component } from 'react';
import RemovalOrder from './FBA/RemovalOrder.js';
//import './App.css';
import NeEbReport from './SalesOrders/NeEbReport.js';
import AmzLabels from './FBA/AmzLabels.js';
import HomeReport from './HomeReport.js';
import NeweggCA from './SalesOrders/NeweggCA';
import AmazonCA from './SalesOrders/AmazonCA';
import WebOrders from './SalesOrders/WebOrders';
import QA from './QA';
import Nav from './Nav.js';
import Sidebar from './Sidebar';
import FNSKULabels from './FBA/FNSKULabels';
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
        <Route path="/web" component={WebOrders}/>
        <Route path="/qa" component={QA}/>
        
        </div>
      </Router>
    );
  }
}

export default App;
