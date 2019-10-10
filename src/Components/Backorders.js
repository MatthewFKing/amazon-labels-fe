import React, { Component } from "react";
import "./App.css";

class Backorders extends Component {
  state = {
    error: "",
    ebOrders: [],
    clearedEBOrders: [],
    ebReport: [],
    lastOrders: [],
    toggleDeleteIDs: false,
    ordersToDelete: [],
  };

  url = "http://10.0.0.234:3030";


  render() {
  
    return (
      <div className="container neeb">

        

      </div>
    );
  }
}

export default Backorders;

    //Scan Order IDs to add to backorders.
    //Display the Product SKU and QTY, Order #, Customer PO #, Due Date, Backordered Part.
    //Product SKU and QTY, Order #, Customer PO #, Due Date, Order Date,  - From SO Data
    //Backordered Part - From BOM Data
    //Show Open POs for that Part - PO Data
    //
    //Needs: 
    //Ability to switch or add the part thats holding the order up.
    //Remove the order manually or remove if the status of that order is changed in the SO report to in progress
    //Sort by due date or sort by model type 
    //Backordered Item Totals.
    //Backordered Item breakdown/report

