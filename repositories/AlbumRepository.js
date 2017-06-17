import BaseRepository from './BaseRepository';
import mongoose from 'mongoose';
const Album = mongoose.model('Album');

class AlbumRepository extends BaseRepository {
  constructor(){
    super(Album);
  }
}

export default new AlbumRepository();
