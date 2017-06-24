import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const routes = (
  <Router>
    <Route path='/' component={App}></Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
