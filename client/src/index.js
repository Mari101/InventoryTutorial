import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const routes = (
  <Router>
    <div>
      <Route exact path='/' component={App}></Route>
      <Route path='/login' component={Login}></Route>
    </div>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
