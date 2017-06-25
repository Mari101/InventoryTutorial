import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/login' component={LoginPage}></Route>
      </div>
    </Router>
    );
  }

export default App;
