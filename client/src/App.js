import React, { Component } from 'react';
import RxHttp from './utils/RxHttp';
import Albums from './components/Albums';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Albums/>
    </div>
    );
  }

export default App;
