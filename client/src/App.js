import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let bids = [
  {
    "quantity": "0.20600000",
    "rate": "0.07459297"
  }
];
let asks = [
  {
    "quantity": "0.87610381",
    "rate": "0.07462634"
  },
];

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      message: ""
    }
  }

  componentDidMount = () => {
    this.loadOrderBook()
  }

  loadOrderBook = () => {
    axios.get('localhost:8080/api/orderBook').then(
      (response) => {
        response.orderBook['bid'].forEach(bid => {
          bids.push(bid);
        });
        response.orderBook['ask'].forEach(ask => {
          asks.push(ask);
        });
        console.log(response)
      }
    )
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <body>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell >Quantity</TableCell >
                  <TableCell  align="right">Rate</TableCell >
                </TableRow>
              </TableHead>
              <TableBody>
                {asks.map((row) => (
                  <TableRow>
                    <TableCell  component="th" scope="row">{row.quantity}</TableCell >
                    <TableCell  align="right">{row.rate}</TableCell >
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell >Quantity</TableCell >
                  <TableCell  align="right">Rate</TableCell >
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map((row) => (
                  <TableRow>
                    <TableCell  component="th" scope="row">{row.quantity}</TableCell >
                    <TableCell  align="right">{row.rate}</TableCell >
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </body>
      </div>
    );
  }
}

export default App;
