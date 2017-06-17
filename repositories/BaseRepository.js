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

  // Get Single
  findById(id) {
    return Rx.Observable.create((subscription) => {
      this.model.findById({_id: id}, (err, results) => {
        if (err) {
          subscription.error(err);
        } else {
          subscription.next(results);
          subscription.complete();
        }
      });
    });
  }

  // Get All
  find(query) {
  // Create Observable
    return Rx.Observable.create((subscription) => {
      // Act on Model from constructor
      this.model.find(query, (err, results) => {
        if (err) {
          subscription.error(err);
        } else {
          subscription.next(results);
          subscription.complete();
        }
      });
    });
  }

  // Add new
  save(model) {
    return Rx.Observable.fromPromise(model.save());
  }

}

export default BaseRepository;
