import React from 'react';
import moment from 'moment';

const QATable = props => {

  let tableStyle = {};
  props.isLoading ? tableStyle.filter = 'blur(2px)' : tableStyle = {}
  
  return (
    <div  className="qalog_table container">
      <table style={tableStyle} className="table table-hover table-striped table-bordered table-sm">
        <caption>Entries: {props.foundEntries.length}</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Order ID</th>
            <th scope="col">Invoice #</th>
            <th scope="col">Serial Number</th>
            <th scope="col">Model</th>
            <th scope="col">Fishbowl SKU</th>
            <th scope="col">Ship Method</th>
            <th scope="col">Tech Number</th>
            <th scope="col">Tracking Number</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>

          {props.foundEntries.map((entry, i) => (
            <tr key={i}>
              <th scope="row">{moment(entry.date).format('L')}</th>
              <td>{entry.order_id}</td>
              <td>{entry.invoice_number}</td>
              <td>{entry.serial}</td>
              <td>{entry.model}</td>
              <td className="sku_column">{entry.sku}</td>
              <td>{entry.shipping_method}</td>
              <td>{entry.tech_number}</td>
              <td>{entry.tracking_number}</td>
              <td>{entry.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default QATable;