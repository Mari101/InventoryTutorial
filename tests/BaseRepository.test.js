// import tools for testing
require('dotenv').config();
import mongoose from 'mongoose';
import assert from 'assert'; // used literally
import BaseRepository from '../repositories/BaseRepository';
import Album from '../models/album';

const BaseRepositoryTest = new BaseRepository(Album);
// Describe functions from imported class
describe('BaseRepository', () => {

  // test before scenario
  before(function () {
    // What should happen before testing? Connect, so connect
    mongoose.connect(process.env.MONGODB);
    mongoose.Promise = global.Promise;
  });

  after(function () {
    // What should happen after testing? Close, so close
    mongoose.connection.close();
  });

  let id;

  describe('.save()', () => {
    it('should save new album to database', (done) =>{
      BaseRepositoryTest.save(new Album(
        {
          "title": "Off the Wall",
          "releaseDate": "August 10, 1979",
          "recordedDate": "December 1978 – June 1979",
          "studio": "Allen Zentz Recording",
          "genre": "Pop",
          "label": "Epic",
          "producer": "Quincy Jones",
          "artist": "Michael Jackson"
        },
      )).subscribe((album) => {
        id = album._id;
        assert.notEqual('', album._id);
        done();
      });
    });
  });

  describe('.findById()', () => {

    // Test begins here!!!
    it('should find collection in database by id:', (done) => {

      BaseRepositoryTest.findById(id).subscribe((album) => {
        // Create the test
        // Asserting that the id variable will match the title
        assert.equal("Off the Wall", album.title);

        // Declare the test as done
        done();
      }, (err) => {

      });
    });

    // Another test
    it('should return message stating nothing was found:', (done) => {

      BaseRepositoryTest.findById('593d6c6b6201920c346de486').subscribe((album) => {
        // Create test
        // Assert that if nothing is found -the album- null is the expectation
        // Testing successful execution!!!!
        assert.equal(album, null);
        done();
      }, (err) => {

      });
    });

    // Invalid id test e.g length of id
    it('should return an error if ID is invalid', (done) => {
      BaseRepositoryTest.findById('593d6c6b6201920c346de486---IamFAKE').subscribe((album) => {
        assert.notEqual(undefined, album);
        done();
      }, (err) => {
        // Comparion in the assert
        assert.notEqual(undefined, err);
        done();
      });
    });
  });


});

// Note red green refactor testing
// Integration Testing
