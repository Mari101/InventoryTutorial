import React, { Component } from 'react';
import InventoryClient, { TokenManager as tm } from '../utils/InventoryClient';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email:'', password: '' };
    this.client = new InventoryClient();
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.client.login(this.state).subscribe(data => {
      tm.setToken(data.token);
      window.location = '/';
    }, err => {
      console.log('Error: ', err.response.data);
    });
  }

  render() {
    return (
      <div className="container mg-top">
        <div className="row">
          <form className="col-xs-4 col-xs-offset-4">
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input onChange={e => {this.setState({email: e.target.value})}} type="email" className="form-control" id="email"/>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input onChange={e => {this.setState({password: e.target.value})}} type="password" className="form-control" id="pwd"/>
            </div>
            <div className="text-center">
              <input onClick={this.login} type="submit" className="btn btn-default" value="Submit"/>
            </div>
          </form>
      </div>
    </div>
    )
  }
}

export default Login;
