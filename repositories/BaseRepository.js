// Import mongoose Rx and mongoose
import Rx from 'rxjs/Rx';
import mongoose from 'mongoose';

// Create Base Repository to template database access
// This outlines the 'controller callback functions'

// Creating an Observable from database queries.
// These Observables are subscribed to in the controllers

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
    // return Rx.Observable.create((observer) => {
    //   // Act on Model from constructor
    //   this.model.find(query, (err, results) => {
    //     if (err) {
    //       observer.error(err);
    //     } else {
    //       observer.next(results);
    //       observer.complete();
    //     }
    //   });
    // });

    // Create from promise
    return Rx.Observable.fromPromise(this.model.find(query));
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

  // findOne
  findOne(criteria) {
    return Rx.Observable.create(observer => {
      this.model.findOne(criteria, (err, user) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(user);
          observer.complete();
        }
      })
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
