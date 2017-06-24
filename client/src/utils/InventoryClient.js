import RxHttp from './RxHttp';

export const TokenManager = {

  setToken: (token) => {
    window.sessionStorage.setItem('token', token);
  },

  getToken: () => {
    return window.sessionStorage.getItem('token');
  },

  removeToken: () => {
    window.sessionStorage.removeItem('token');
  }
};

class InventoryClient {
  constructor(){
    this.client = new RxHttp('http://localhost:7000');
  }

  login(credentials) {
    return this.client.post('/login', credentials).map(response => response.data);
  }

  getUsers() {
    return this.client.get('/users', {
      headers: {
        Authorization: `Bearer ${TokenManager.getToken()}`
      }
    }).map(response => response.data);
  }
}





export default InventoryClient;
