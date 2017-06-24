import Rx from 'rxjs/Rx';
import axios from 'axios';

class RxHttp {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  get(path, config) {
    // pass path to axios
    const promise = axios.get(`${this.baseurl}${path}`, config);
    return Rx.Observable.fromPromise(promise);
  }

  post(path, payload, config) {
    const promise = axios.post(`${this.baseurl}${path}`, payload, config);
    return Rx.Observable.fromPromise(promise);
  }
}



export default RxHttp;
