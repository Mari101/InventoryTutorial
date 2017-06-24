import React, { Component } from 'react';
import RxHttp from './utils/RxHttp';
import Albums from './components/Albums';
import InventoryClient from './utils/InventoryClient';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new InventoryClient();
    this.state = { data: []}
  }
  // componentWillMount() {
  //   this.client.getUsers('/users').subscribe((data) => {
  //     this.setState({data: data});
  //   }, err => {
  //     console.log('Error:', err);
  //   })
  // }
  render() {
    return (
    <div className="container">
      <Albums/>
    </div>
    );
  }
}

export default App;
