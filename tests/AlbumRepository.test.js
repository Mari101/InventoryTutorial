// import tools for testing
require('dotenv').config();
import mongoose from 'mongoose';
import assert from 'assert'; // used literally
import AlbumRepository from '../repositories/AlbumRepository';
import Album from '../models/album';

describe('AlbumRepository', () => {

  before(function () {
    // What should happen before testing? Connect, so connect
    mongoose.connect(process.env.MONGODB);
    mongoose.Promise = global.Promise;
  });

  after(function () {
    // What should happen after testing? Close, so close
    mongoose.connection.close();
  });

  describe('.save()', () => {
    it('should save new album to database', (done) =>{
      AlbumRepository.save(
        {
          "title": "Off the Wall",
          "releaseDate": "August 10, 1979",
          "recordedDate": "December 1978 – June 1979",
          "studio": "Allen Zentz Recording",
          "genre": "Pop",
          "label": "Epic",
          "producer": "Quincy Jones",
          "artist": "Michael Jackson"
        }
      ).subscribe((album) => {
        assert.notEqual('', album._id);
        done();
      });
    });
  });



});
