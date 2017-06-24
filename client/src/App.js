import React, { Component } from 'react';
import RxHttp from './utils/RxHttp';
import Login from './components/Login';
import InventoryClient from './utils/InventoryClient';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new InventoryClient();
    this.state = { data: []}
  }
  componentWillMount() {
    this.client.getUsers('/users').subscribe((data) => {
      this.setState({data: data});
    }, err => {
      console.log('Error:', err);
    })
  }
  render() {
    console.log("My Response", this.state.data);
    return (
    <div className="col-xs-4">
      <Login/>
    </div>
    );
  }
}

export default App;
