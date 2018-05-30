import Rx from 'rxjs/Rx';
import RxHttp from './RxHttp';

// Object to handle the session token sent at login
export const TokenManager = {

  // Set Token to session on Login
  setToken: (token) => {
    window.sessionStorage.setItem('token', token);
  },

  // Retreive token during a session
  getToken: () => {
    return window.sessionStorage.getItem('token');
  },

  // Delete token on logout
  removeToken: () => {
    window.sessionStorage.removeItem('token');
  },

  // Test if there is token
  hasToken: () => {
    const token = this.getToken();
    return token && token !== '';
  }
};

// Service to make calls to API
class InventoryClient {
  constructor(){
    this.client = new RxHttp('http://localhost:7000');
  }

  getHeader() {
    return {
      headers: {
        Authorization: `Bearer ${TokenManager.getToken()}`
      }
    };
  }

  get(path) {
    return this.client.get(path, this.getHeader()).map(response => response.data);
  }

  login(credentials) {
    return this.client.post('/login', credentials).flatMap(res => {
      if (res.status != 200) {
        return Rx.Observable.throw(new Error(res.data.message));
      }
      return Rx.Observable.of(res);
    })
    .map(response => response.data);
  }

  getUsers() {
    return this.get('/users');
  }

  getAlbums() {
    return this.get('/albums');
  }
}


export default InventoryClient;
