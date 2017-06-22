// Import mongoose Rx and mongoose
import Rx from 'rxjs/Rx';
import mongoose from 'mongoose';

// Create Base Repository to template database access
// This outlines the 'controller callback functions'

// Database queries defined here Defining the CRUD

class BaseRepository {
  constructor(model){
    this.model = model;
  }

  // Add New
  save(model) {
    return Rx.Observable.fromPromise(model.save());
  }

  // Get All
  find(query) {
  // Create Observable
    return Rx.Observable.create((observer) => {
      // Act on Model from constructor
      this.model.find(query, (err, results) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(results);
          observer.complete();
        }
      });
    });
  }


  // Get Single By Id
  findById(id) {
    return Rx.Observable.create((observer) => {
      this.model.findById({_id: id}, (err, results) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(results);
          observer.complete();
        }
      });
    });
  }

  // Update
  update(id, body) {
    return Rx.Observable.create(observer => {
      this.model.update({_id: id}, body, (err, results) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(results);
          observer.complete();
        }
      });
    });
  }

  // Delete
  delete(id) {
    return Rx.Observable.create(observer => {
      this.model.remove({_id: id}, (err, results) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(results);
          observer.complete();
        }
      });
    });
  }

}

export default BaseRepository;
