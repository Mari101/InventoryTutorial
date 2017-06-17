// Import mongoose Rx and mongoose
import Rx from 'rxjs/Rx';
import mongoose from 'mongoose';

// Create Base Repository to template database access
// This outlines the 'controller callback functions'
class BaseRepository {
  constructor(model){
    this.model = model;
  }

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

  // Define Database call
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
      })
    })
  }
}

export default BaseRepository;
